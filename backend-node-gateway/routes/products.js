const express = require("express");
const axios = require("axios");
const { verifyToken, requireRole } = require("../middleware/auth");
const { validateProduct } = require("../middleware/validate");
const { syncProductToMongo, deleteProductFromMongo } = require("../services/mongodb");

const router = express.Router();
const SPRINGBOOT_URL = process.env.SPRINGBOOT_URL || "http://localhost:8080";

// Forward authorization headers to backend
function forwardHeaders(req) {
  const headers = {};
  if (req.headers.authorization) {
    headers.authorization = req.headers.authorization;
  }
  return headers;
}

// GET ALL PRODUCTS
// Express mounts this router at /products and /api/products, so we handle both:
// GET /products/all & GET /api/products
const handleGetAll = async (req, res) => {
  try {
    const response = await axios.get(`${SPRINGBOOT_URL}/products/all`, {
      headers: forwardHeaders(req)
    });
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return res.status(502).json({
      success: false,
      message: `Backend error: ${error.message}`
    });
  }
};
router.get("/all", handleGetAll);
router.get("/", handleGetAll);

// GET PRODUCT BY ID
// GET /products/:id & GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(`${SPRINGBOOT_URL}/products/${req.params.id}`, {
      headers: forwardHeaders(req)
    });
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return res.status(502).json({
      success: false,
      message: `Backend error: ${error.message}`
    });
  }
});

// ADD PRODUCT
// POST /products/add & POST /api/products
const handleAddProduct = async (req, res) => {
  try {
    const response = await axios.post(`${SPRINGBOOT_URL}/products/add`, req.body, {
      headers: forwardHeaders(req)
    });
    
    if (response.status === 200 || response.status === 201) {
      // Sync to MongoDB Atlas on successful insert
      const createdProduct = response.data;
      await syncProductToMongo(createdProduct);
    }
    
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return res.status(502).json({
      success: false,
      message: `Backend error: ${error.message}`
    });
  }
};
router.post("/add", verifyToken, requireRole(["ADMIN", "MANAGER"]), validateProduct, handleAddProduct);
router.post("/", verifyToken, requireRole(["ADMIN", "MANAGER"]), validateProduct, handleAddProduct);

// UPDATE PRODUCT
// PUT /products/update/:id & PUT /api/products/:id
const handleUpdateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const response = await axios.put(`${SPRINGBOOT_URL}/products/update/${productId}`, req.body, {
      headers: forwardHeaders(req)
    });
    
    if (response.status === 200) {
      // Sync updated fields to MongoDB Atlas
      const updatedProduct = response.data;
      await syncProductToMongo(updatedProduct);
    }
    
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return res.status(502).json({
      success: false,
      message: `Backend error: ${error.message}`
    });
  }
};
router.put("/update/:id", verifyToken, requireRole(["ADMIN", "MANAGER"]), validateProduct, handleUpdateProduct);
router.put("/:id", verifyToken, requireRole(["ADMIN", "MANAGER"]), validateProduct, handleUpdateProduct);

// DELETE PRODUCT
// DELETE /products/delete/:id & DELETE /api/products/:id
const handleDeleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    // Delete from MongoDB Atlas first (matching the FastAPI logic)
    await deleteProductFromMongo(productId);
    
    const response = await axios.delete(`${SPRINGBOOT_URL}/products/delete/${productId}`, {
      headers: forwardHeaders(req)
    });
    
    return res.status(response.status).send(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return res.status(502).json({
      success: false,
      message: `Backend error: ${error.message}`
    });
  }
};
router.delete("/delete/:id", verifyToken, requireRole(["ADMIN", "MANAGER"]), handleDeleteProduct);
router.delete("/:id", verifyToken, requireRole(["ADMIN", "MANAGER"]), handleDeleteProduct);

module.exports = router;
