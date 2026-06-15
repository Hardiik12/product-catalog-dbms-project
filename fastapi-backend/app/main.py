import httpx
import re
from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, Field, field_validator
from typing import Optional

from app.routes.search import router as search_router
from app.database.mongodb import product_collection, embedding_collection
from app.services.embedding_service import generate_embedding

app = FastAPI(title="VectorCart API Gateway")

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SPRINGBOOT_URL = "http://localhost:8080"

# ── PYDANTIC SCHEMAS ──────────────────────────────────────────────────────────

class LoginSchema(BaseModel):
    email: str = Field(..., description="User email address")
    password: str = Field(..., description="User password")

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Email cannot be empty")
        if "@" not in v or "." not in v:
            raise ValueError("Invalid email format")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Password cannot be empty")
        return v


class SignupSchema(BaseModel):
    fullname: str = Field(..., description="Full name of the user")
    email: str    = Field(..., description="Email address")
    password: str = Field(..., description="Password")
    role: str     = Field(..., description="Role of the user")

    @field_validator("fullname")
    @classmethod
    def validate_fullname(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Full name cannot be empty")
        return v

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Email cannot be empty")
        if "@" not in v or "." not in v:
            raise ValueError("Invalid email format")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters long")
        return v

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Role cannot be empty")
        return v


class ProductSchema(BaseModel):
    id: Optional[int] = None
    name: str     = Field(..., description="Product name")
    brand: str    = Field(..., description="Product brand")
    price: float  = Field(..., description="Product price")
    imageUrl: str = Field(..., description="Product image URL")
    stock: int    = Field(..., description="Product stock count")
    category: str = Field(..., description="Product category")

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Product name cannot be empty")
        return v

    @field_validator("brand")
    @classmethod
    def validate_brand(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Brand cannot be empty")
        return v

    @field_validator("price")
    @classmethod
    def validate_price(cls, v: float) -> float:
        if v <= 0:
            raise ValueError("Price must be a positive number")
        return v

    @field_validator("imageUrl")
    @classmethod
    def validate_image_url(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Image URL cannot be empty")
        return v

    @field_validator("stock")
    @classmethod
    def validate_stock(cls, v: int) -> int:
        if v < 0:
            raise ValueError("Stock cannot be negative")
        return v

    @field_validator("category")
    @classmethod
    def validate_category(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Category cannot be empty")
        return v


# ── VALIDATION ERROR HANDLER ──────────────────────────────────────────────────

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    if errors:
        error_detail = errors[0]
        msg   = error_detail.get("msg", "Validation Error")
        loc   = error_detail.get("loc", [])
        field = ".".join(str(l) for l in loc if l != "body")
        message = f"Validation Error: {field} - {msg}" if field else f"Validation Error: {msg}"
    else:
        message = "Validation Error"

    return JSONResponse(
        status_code=400,
        content={"success": False, "message": message}
    )


# ── MONGODB SYNC HELPERS ───────────────────────────────────────────────────────

def _generate_description(product: dict) -> str:
    """Build a rich natural-language description used for semantic embeddings."""
    name     = product.get("name", "")
    brand    = product.get("brand", "")
    category = product.get("category", "")
    price    = product.get("price", 0)
    stock    = product.get("stock", 0)
    return (
        f"{name} by {brand}. "
        f"A {category} product priced at ₹{price:,.0f}. "
        f"{stock} units in stock."
    )


def sync_product_to_mongodb(product: dict):
    """Upsert a product and its embedding into MongoDB (keyed by pg_id)."""
    pg_id       = product.get("id")
    description = _generate_description(product)
    embedding   = generate_embedding(description)

    # Upsert full product document into product_descriptions
    product_collection.update_one(
        {"pg_id": pg_id},
        {"$set": {
            "pg_id":       pg_id,
            "productName": product.get("name"),
            "brand":       product.get("brand"),
            "price":       product.get("price"),
            "imageUrl":    product.get("imageUrl"),
            "stock":       product.get("stock"),
            "category":    product.get("category"),
            "description": description,
        }},
        upsert=True,
    )

    # Upsert embedding
    embedding_collection.update_one(
        {"pg_id": pg_id},
        {"$set": {
            "pg_id":       pg_id,
            "productName": product.get("name"),
            "embedding":   embedding,
        }},
        upsert=True,
    )


def delete_product_from_mongodb(pg_id: int):
    """Remove a product and its embedding from MongoDB."""
    product_collection.delete_one({"pg_id": pg_id})
    embedding_collection.delete_one({"pg_id": pg_id})


# ── PROXY UTILITY ─────────────────────────────────────────────────────────────

def _forward_headers(request: Request) -> dict:
    """Extract headers to forward (preserving Authorization)."""
    return {
        k: v for k, v in request.headers.items()
        if k.lower() not in ("host", "content-length", "content-type")
    }


def _build_response(response: httpx.Response) -> Response:
    """Convert an httpx Response → FastAPI Response, stripping hop-by-hop headers."""
    skip = {"content-length", "content-encoding", "transfer-encoding"}
    resp_headers = {k: v for k, v in response.headers.items() if k.lower() not in skip}
    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=resp_headers,
        media_type=response.headers.get("content-type"),
    )


async def proxy_request(request: Request, path: str, method: str, body: dict = None) -> Response:
    url     = f"{SPRINGBOOT_URL}/{path}"
    params  = dict(request.query_params)
    headers = _forward_headers(request)

    async with httpx.AsyncClient() as client:
        try:
            if   method == "GET":    r = await client.get   (url, params=params, headers=headers)
            elif method == "POST":   r = await client.post  (url, params=params, headers=headers, json=body)
            elif method == "PUT":    r = await client.put   (url, params=params, headers=headers, json=body)
            elif method == "DELETE": r = await client.delete(url, params=params, headers=headers)
            else:
                raise HTTPException(status_code=405, detail="Method not allowed")
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail=f"Backend error: {exc}")

    return _build_response(r)


# ── ROUTES ─────────────────────────────────────────────────────────────────────

@app.get("/")
def home():
    return {"message": "FastAPI API Gateway Running 🚀"}


# ── AUTH ──────────────────────────────────────────────────────────────────────

@app.post("/auth/login")
async def login(payload: LoginSchema, request: Request):
    return await proxy_request(request, "auth/login", "POST", payload.model_dump())


@app.post("/auth/signup")
async def signup(payload: SignupSchema, request: Request):
    return await proxy_request(request, "auth/signup", "POST", payload.model_dump())


# ── PRODUCTS (proxy + MongoDB mirror) ────────────────────────────────────────

@app.get("/products/all")
async def get_all_products(request: Request):
    return await proxy_request(request, "products/all", "GET")


@app.get("/products/{product_id}")
async def get_product_by_id(product_id: int, request: Request):
    return await proxy_request(request, f"products/{product_id}", "GET")


@app.post("/products/add")
async def add_product(payload: ProductSchema, request: Request):
    """Add product in PostgreSQL (via Spring Boot), then mirror to MongoDB."""
    headers = _forward_headers(request)

    async with httpx.AsyncClient() as client:
        try:
            r = await client.post(
                f"{SPRINGBOOT_URL}/products/add",
                json=payload.model_dump(),
                headers=headers,
            )
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail=f"Backend error: {exc}")

    if r.status_code == 200:
        created = r.json()          # Spring Boot returns the saved Product with its new ID
        sync_product_to_mongodb(created)

    return _build_response(r)


@app.put("/products/update/{product_id}")
async def update_product(product_id: int, payload: ProductSchema, request: Request):
    """Update product in PostgreSQL, then refresh MongoDB mirror."""
    headers = _forward_headers(request)

    async with httpx.AsyncClient() as client:
        try:
            r = await client.put(
                f"{SPRINGBOOT_URL}/products/update/{product_id}",
                json=payload.model_dump(),
                headers=headers,
            )
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail=f"Backend error: {exc}")

    if r.status_code == 200:
        updated = r.json()
        sync_product_to_mongodb(updated)

    return _build_response(r)


@app.delete("/products/delete/{product_id}")
async def delete_product(product_id: int, request: Request):
    """Delete from PostgreSQL, then remove from MongoDB."""
    # Remove from MongoDB first (before Spring Boot deletes it)
    delete_product_from_mongodb(product_id)
    return await proxy_request(request, f"products/delete/{product_id}", "DELETE")


# ── ADMIN: BULK SYNC ───────────────────────────────────────────────────────────

@app.post("/admin/sync-products")
async def bulk_sync_products():
    """
    One-shot admin endpoint: fetches ALL products from PostgreSQL (Spring Boot)
    and upserts every one into MongoDB with a generated description + embedding.
    Safe to call multiple times (idempotent upsert).
    """
    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(f"{SPRINGBOOT_URL}/products/all")
            if r.status_code != 200:
                raise HTTPException(status_code=502, detail="Failed to reach Spring Boot backend")
            products = r.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail=f"Backend error: {exc}")

    synced = 0
    for product in products:
        sync_product_to_mongodb(product)
        synced += 1

    return {
        "success": True,
        "message": f"✅ Synced {synced} products from PostgreSQL → MongoDB",
        "count": synced,
    }


# ── SEARCH ROUTER ─────────────────────────────────────────────────────────────
app.include_router(search_router)