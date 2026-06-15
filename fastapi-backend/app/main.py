from fastapi import FastAPI
from app.routes.search import router as search_router

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "FastAPI Running 🚀"
    }
app.include_router(search_router)