require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const { connectMongo, syncProductToMongo } = require("./services/mongodb");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");
const searchRouter = require("./routes/search");
const { verifyToken, requireRole } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 8000;

// ── GLOBAL MIDDLEWARE ────────────────────────────────────────────────────────
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev")); // Request logging

// ── CONNECT TO MONGODB ATLAS ────────────────────────────────────────────────
connectMongo().catch(err => {
  console.error("MongoDB Atlas connection failed initially, server will retry on request:", err.message);
});

// ── ROOT PATH ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "VectorCart Node.js API Gateway Running 🚀" });
});

// ── MOUNT ROUTERS ────────────────────────────────────────────────────────────
// Support both standard front-end calls and user-specified "/api" prefixes
app.use("/auth", authRouter);
app.use("/api/auth", authRouter);

app.use("/products", productRouter);
app.use("/api/products", productRouter);

app.use("/", searchRouter);
app.use("/api", searchRouter);

// ── ADMIN: BULK SYNC POSTGRES -> MONGODB ────────────────────────────────────
const handleBulkSync = async (req, res) => {
  try {
    const SPRINGBOOT_URL = process.env.SPRINGBOOT_URL || "http://localhost:8080";
    const response = await axios.get(`${SPRINGBOOT_URL}/products/all`);
    const products = response.data;
    
    let synced = 0;
    for (const product of products) {
      await syncProductToMongo(product);
      synced++;
    }
    
    return res.json({
      success: true,
      message: `✅ Synced ${synced} products from PostgreSQL → MongoDB Atlas`,
      count: synced
    });
  } catch (error) {
    console.error("Bulk sync error:", error.message);
    return res.status(500).json({
      success: false,
      message: `Bulk sync failed: ${error.message}`
    });
  }
};
app.post("/admin/sync-products", handleBulkSync);
app.post("/api/admin/sync-products", handleBulkSync);

// ── MOCK ANALYTICS, USERS & INVENTORY (GATEWAY EXCLUSIVE MODULES) ─────────────

// GET /users and /api/users
// Role: ADMIN
const handleGetUsers = (req, res) => {
  return res.json([
    { id: 1, fullname: "Hardik", email: "hardik@gmail.com", role: "ADMIN", status: "ACTIVE" },
    { id: 2, fullname: "Kuldeep", email: "kuldeep@gmail.com", role: "MANAGER", status: "ACTIVE" },
    { id: 3, fullname: "Rohan", email: "rohan@gmail.com", role: "USER", status: "ACTIVE" }
  ]);
};
app.get("/users", verifyToken, requireRole(["ADMIN"]), handleGetUsers);
app.get("/api/users", verifyToken, requireRole(["ADMIN"]), handleGetUsers);

// GET /inventory and /api/inventory
// Role: ADMIN or MANAGER
const handleGetInventory = (req, res) => {
  return res.json([
    { id: 1, name: "iPhone 15", stock: 25, status: "In Stock" },
    { id: 2, name: "MacBook Air", stock: 12, status: "In Stock" },
    { id: 3, name: "Samsung S24", stock: 30, status: "In Stock" },
    { id: 4, name: "Sony Headphones", stock: 8, status: "Low Stock" }
  ]);
};
app.get("/inventory", verifyToken, requireRole(["ADMIN", "MANAGER"]), handleGetInventory);
app.get("/api/inventory", verifyToken, requireRole(["ADMIN", "MANAGER"]), handleGetInventory);

// GET /analytics and /api/analytics
// Role: ADMIN or MANAGER
const handleGetAnalytics = (req, res) => {
  return res.json({
    totalSales: 1254000,
    totalOrders: 320,
    activeUsers: 84,
    categoryDistribution: {
      Electronics: 55,
      Clothing: 25,
      Home: 20
    }
  });
};
app.get("/analytics", verifyToken, requireRole(["ADMIN", "MANAGER"]), handleGetAnalytics);
app.get("/api/analytics", verifyToken, requireRole(["ADMIN", "MANAGER"]), handleGetAnalytics);

// ── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// ── START APP ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`VectorCart Node.js API Gateway listening on port ${PORT} 🚀`);
});
