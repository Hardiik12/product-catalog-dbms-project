const express = require("express");
const axios = require("axios");
const { validateLogin, validateSignup } = require("../middleware/validate");

const router = express.Router();
const SPRINGBOOT_URL = process.env.SPRINGBOOT_URL || "http://localhost:8080";

// SIGNUP PROXY
router.post("/signup", validateSignup, async (req, res) => {
  try {
    const response = await axios.post(`${SPRINGBOOT_URL}/auth/signup`, req.body);
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

// LOGIN PROXY
router.post("/login", validateLogin, async (req, res) => {
  try {
    const response = await axios.post(`${SPRINGBOOT_URL}/auth/login`, req.body);
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

module.exports = router;
