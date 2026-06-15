from pymongo import MongoClient
from pymongo.server_api import ServerApi

MONGO_URL = "mongodb+srv://hardiikgupta_db_user:hardik12@productcatalog.uqdoop8.mongodb.net/?appName=productCatalog"

# ServerApi v1 required for MongoDB Atlas Stable API
client = MongoClient(
    MONGO_URL,
    server_api=ServerApi("1"),
)

db = client["product_catalog_ai"]

product_collection = db["product_descriptions"]

embedding_collection = db["product_embeddings"]

search_logs_collection = db["user_search_logs"]