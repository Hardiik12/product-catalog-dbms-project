import re
from fastapi import APIRouter
from app.database.mongodb import (
    product_collection,
    embedding_collection,
)
from app.services.embedding_service import (
    generate_embedding,
    calculate_similarity,
)

router = APIRouter()


# ── LEGACY NAME MATCHER (fallback for old seed documents without pg_id) ───────

def _name_match_score(mongo_name: str, pg_products: list):
    """Return the best-matching PostgreSQL product by token overlap."""
    m_lower = mongo_name.lower().strip()
    best, best_score = None, 0.0

    for pg in pg_products:
        p_name  = pg.get("name",     "").lower()
        p_brand = pg.get("brand",    "").lower()
        p_cat   = pg.get("category", "").lower()

        if m_lower == p_name:
            return pg  # exact match – return immediately

        if m_lower in p_name or p_name in m_lower:
            score = 0.8
        else:
            tokens_m = set(re.findall(r'\w+', m_lower))
            tokens_p = set(re.findall(r'\w+', p_name + " " + p_brand + " " + p_cat))
            inter    = {tm for tm in tokens_m for tp in tokens_p if tm in tp or tp in tm}
            score    = len(inter) / len(tokens_m) if tokens_m else 0.0

        if score > best_score:
            best_score, best = score, pg

    return best if best_score >= 0.3 else None


# ── SEMANTIC SEARCH ───────────────────────────────────────────────────────────

@router.get("/semantic-search")
async def semantic_search(query: str):
    """
    1. Encode query → embedding
    2. Compare against stored embeddings in MongoDB
    3. For results with score > 0.3:
       - If the document has a pg_id → read all fields directly from MongoDB
         (no extra Spring Boot call needed – data is already mirrored)
       - Legacy docs without pg_id → fall back to name-based matching
    4. Return sorted results
    """
    query_embedding = generate_embedding(query)

    mongo_products = list(product_collection.find())
    embeddings     = list(embedding_collection.find())

    if not mongo_products or not embeddings:
        return []

    stored_embeddings = [item["embedding"] for item in embeddings]
    similarities      = calculate_similarity(query_embedding, stored_embeddings)

    # Build a map: pg_id → full mongo product document (for O(1) lookups)
    pg_id_map = {
        p["pg_id"]: p
        for p in mongo_products
        if p.get("pg_id") is not None
    }

    results = []
    seen_ids = set()           # deduplicate by pg_id

    for i, score in enumerate(similarities):
        if score <= 0.3:
            continue

        emb_doc  = embeddings[i]
        pg_id    = emb_doc.get("pg_id")
        mongo_name = emb_doc.get("productName", "")

        if pg_id is not None and pg_id in pg_id_map:
            # ── Fast path: data is fully mirrored in MongoDB ──────────────────
            if pg_id in seen_ids:
                continue            # skip duplicate (e.g. old seed doc overlap)
            seen_ids.add(pg_id)

            p = pg_id_map[pg_id]
            results.append({
                "id":          pg_id,
                "name":        p.get("productName") or p.get("name", ""),
                "brand":       p.get("brand", ""),
                "price":       p.get("price", 0.0),
                "imageUrl":    p.get("imageUrl", ""),
                "stock":       p.get("stock", 0),
                "category":    p.get("category", ""),
                "description": p.get("description", ""),
                "score":       float(score),
            })

        else:
            # ── Legacy fallback: old seed docs don't have pg_id ──────────────
            # Find the mongo description doc that matches this embedding doc
            mongo_p = next(
                (m for m in mongo_products
                 if m.get("productName") == mongo_name and m.get("pg_id") is None),
                None,
            )
            description = mongo_p.get("description", "") if mongo_p else ""

            results.append({
                "id":          None,
                "name":        mongo_name,
                "brand":       "Catalog",
                "price":       0.0,
                "imageUrl":    f"https://loremflickr.com/800/600/{_keyword(mongo_name)}",
                "stock":       0,
                "category":    "Uncategorized",
                "description": description,
                "score":       float(score),
            })

    # Sort by relevance
    results.sort(key=lambda x: x["score"], reverse=True)
    return results


def _keyword(name: str) -> str:
    tokens = re.findall(r'\w+', name.lower())
    return tokens[0] if tokens else "product"