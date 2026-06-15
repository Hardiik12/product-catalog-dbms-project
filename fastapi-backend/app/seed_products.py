from app.database.mongodb import (
    product_collection,
    embedding_collection
)

from app.services.embedding_service import (
    generate_embedding
)

products = [

    {
        "productName":
            "Gaming Laptop",

        "description":
            "Affordable high performance gaming laptop"
    },

    {
        "productName":
            "iPhone Camera Pro",

        "description":
            "Best phone for photography and video"
    },

    {
        "productName":
            "Student Laptop",

        "description":
            "Budget laptop for students and coding"
    }
]

for product in products:

    product_collection.insert_one(product)

    embedding = generate_embedding(
        product["description"]
    )

    embedding_collection.insert_one({

        "productName":
            product["productName"],

        "embedding":
            embedding
    })

print("Products Seeded")