from fastapi import APIRouter

from app.database.mongodb import (
    product_collection,
    embedding_collection
)

from app.services.embedding_service import (
    generate_embedding,
    calculate_similarity
)

router = APIRouter()


@router.get("/semantic-search")
def semantic_search(query: str):

    query_embedding = generate_embedding(query)

    products = list(product_collection.find())

    embeddings = list(embedding_collection.find())

    stored_embeddings = [
        item["embedding"]
        for item in embeddings
    ]

    similarities = calculate_similarity(
        query_embedding,
        stored_embeddings
    )

    results = []

    for i, score in enumerate(similarities):

        if score > 0.3:

            product = products[i]

            results.append({

                "productName":
                    product["productName"],

                "description":
                    product["description"],

                "score":
                    float(score)
            })

    results = sorted(
        results,
        key=lambda x: x["score"],
        reverse=True
    )

    return results