from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer(
    'all-MiniLM-L6-v2'
)


def generate_embedding(text):

    embedding = model.encode(text)

    return embedding.tolist()


def calculate_similarity(
        query_embedding,
        stored_embeddings
):

    similarities = cosine_similarity(
        [query_embedding],
        stored_embeddings
    )

    return similarities[0]