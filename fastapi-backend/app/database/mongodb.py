from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

db = client["product_catalog_ai"]

product_collection = db["product_descriptions"]

embedding_collection = db["product_embeddings"]

search_logs_collection = db["user_search_logs"]