const { MongoClient } = require("mongodb");
const axios = require("axios");

let db = null;

async function connectMongo() {
  if (db) return db;
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db(process.env.MONGO_DB_NAME || "product_catalog_ai");
    console.log("Connected to MongoDB Atlas successfully! 🍃");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error.message);
    throw error;
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectMongo() first.");
  }
  return db;
}

function generateDescription(product) {
  const name = product.name || "";
  const brand = product.brand || "";
  const category = product.category || "";
  const price = product.price || 0;
  const stock = product.stock || 0;
  
  // Format price matching the Python sidecar ₹12,345
  const formattedPrice = Number(price).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  return `${name} by ${brand}. A ${category} product priced at ₹${formattedPrice}. ${stock} units in stock.`;
}

async function syncProductToMongo(product) {
  try {
    const database = getDb();
    const productCol = database.collection("product_descriptions");
    const embeddingCol = database.collection("product_embeddings");

    const pg_id = Number(product.id);
    const description = generateDescription(product);

    console.log(`Generating embedding for: "${description}"`);
    const sidecarUrl = process.env.EMBEDDING_SIDECAR_URL || "http://127.0.0.1:8001/embed";
    
    let embedding;
    try {
      const response = await axios.post(sidecarUrl, { text: description });
      embedding = response.data.embedding;
    } catch (err) {
      console.error("Error generating embedding from sidecar:", err.message);
      // Fallback: use a zero vector of 384 dimensions if sidecar is down, 
      // but log a warning
      embedding = new Array(384).fill(0.0);
    }

    // Upsert product metadata
    await productCol.updateOne(
      { pg_id: pg_id },
      {
        $set: {
          pg_id: pg_id,
          productName: product.name,
          brand: product.brand,
          price: product.price,
          imageUrl: product.imageUrl,
          stock: product.stock,
          category: product.category,
          description: description,
        }
      },
      { upsert: true }
    );

    // Upsert embedding vector
    await embeddingCol.updateOne(
      { pg_id: pg_id },
      {
        $set: {
          pg_id: pg_id,
          productName: product.name,
          embedding: embedding
        }
      },
      { upsert: true }
    );

    console.log(`Successfully synced product id ${pg_id} to MongoDB Atlas.`);
  } catch (error) {
    console.error(`Failed to sync product to MongoDB: ${error.message}`);
  }
}

async function deleteProductFromMongo(pgId) {
  try {
    const database = getDb();
    const pg_id = Number(pgId);
    
    await database.collection("product_descriptions").deleteOne({ pg_id: pg_id });
    await database.collection("product_embeddings").deleteOne({ pg_id: pg_id });
    
    console.log(`Successfully deleted product id ${pg_id} from MongoDB Atlas.`);
  } catch (error) {
    console.error(`Failed to delete product from MongoDB: ${error.message}`);
  }
}

module.exports = {
  connectMongo,
  getDb,
  syncProductToMongo,
  deleteProductFromMongo
};
