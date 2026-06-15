const express = require("express");
const axios = require("axios");
const { getDb } = require("../services/mongodb");

const router = express.Router();

// Helper functions for vector similarity
function dotProduct(a, b) {
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}

function magnitude(a) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * a[i];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(a, b) {
  if (a.length !== b.length) return 0;
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

// SEMANTIC SEARCH
router.get("/semantic-search", async (req, res) => {
  const query = req.query.query;
  if (!query || String(query).trim() === "") {
    return res.json([]);
  }

  try {
    // 1. Encode query -> embedding using Python sidecar
    const sidecarUrl = process.env.EMBEDDING_SIDECAR_URL || "http://127.0.0.1:8001/embed";
    const embedRes = await axios.post(sidecarUrl, { text: query });
    const queryEmbedding = embedRes.data.embedding;

    // 2. Fetch stored descriptions and embeddings from MongoDB Atlas
    const db = getDb();
    const mongoProducts = await db.collection("product_descriptions").find().toArray();
    const embeddings = await db.collection("product_embeddings").find().toArray();

    if (!mongoProducts.length || !embeddings.length) {
      return res.json([]);
    }

    // Map: pg_id -> full mongo product document
    const pgIdMap = {};
    mongoProducts.forEach(p => {
      if (p.pg_id !== undefined && p.pg_id !== null) {
        pgIdMap[p.pg_id] = p;
      }
    });

    const results = [];
    const seenIds = new Set();

    // 3. Compute similarities
    for (const embDoc of embeddings) {
      const storedVec = embDoc.embedding;
      if (!storedVec || !Array.isArray(storedVec)) continue;

      const score = cosineSimilarity(queryEmbedding, storedVec);
      if (score <= 0.3) continue;

      const pg_id = embDoc.pg_id;
      const mongo_name = embDoc.productName || "";

      if (pg_id !== undefined && pg_id !== null) {
        // Mirrored product path
        if (seenIds.has(pg_id)) continue;
        seenIds.add(pg_id);

        const p = pgIdMap[pg_id];
        if (p) {
          results.push({
            id: pg_id,
            name: p.productName || p.name || "",
            brand: p.brand || "",
            price: Number(p.price) || 0.0,
            imageUrl: p.imageUrl || "",
            stock: Number(p.stock) || 0,
            category: p.category || "",
            description: p.description || "",
            score: Number(score)
          });
        }
      } else {
        // Legacy seed documents path
        const mongo_p = mongoProducts.find(m => m.productName === mongo_name && (m.pg_id === undefined || m.pg_id === null));
        const description = mongo_p ? mongo_p.description : "";
        const firstWord = mongo_name.split(/\W+/)[0] || "product";

        results.push({
          id: null,
          name: mongo_name,
          brand: "Catalog",
          price: 0.0,
          imageUrl: `https://loremflickr.com/800/600/${firstWord.toLowerCase()}`,
          stock: 0,
          category: "Uncategorized",
          description: description,
          score: Number(score)
        });
      }
    }

    // Sort by relevance
    results.sort((a, b) => b.score - a.score);
    return res.json(results);

  } catch (error) {
    console.error("Semantic search error:", error.message);
    return res.status(500).json({
      success: false,
      message: `Semantic search error: ${error.message}`
    });
  }
});

module.exports = router;
