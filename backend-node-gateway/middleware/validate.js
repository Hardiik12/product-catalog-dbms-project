function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (email === undefined || email === null || String(email).trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: email - Email cannot be empty"
    });
  }

  const emailStr = String(email).trim();
  if (!emailStr.includes("@") || !emailStr.includes(".")) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: email - Invalid email format"
    });
  }

  if (password === undefined || password === null || String(password).trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: password - Password cannot be empty"
    });
  }

  next();
}

function validateSignup(req, res, next) {
  const { fullname, email, password, role } = req.body;

  if (fullname === undefined || fullname === null || String(fullname).trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: fullname - Full name cannot be empty"
    });
  }

  if (email === undefined || email === null || String(email).trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: email - Email cannot be empty"
    });
  }

  const emailStr = String(email).trim();
  if (!emailStr.includes("@") || !emailStr.includes(".")) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: email - Invalid email format"
    });
  }

  if (password === undefined || password === null || String(password).length < 6) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: password - Password must be at least 6 characters long"
    });
  }

  if (role === undefined || role === null || String(role).trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: role - Role cannot be empty"
    });
  }

  next();
}

function validateProduct(req, res, next) {
  const { name, brand, price, imageUrl, stock, category } = req.body;

  if (name === undefined || name === null || String(name).trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: name - Product name cannot be empty"
    });
  }

  if (brand === undefined || brand === null || String(brand).trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: brand - Brand cannot be empty"
    });
  }

  if (price === undefined || price === null || isNaN(Number(price)) || Number(price) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: price - Price must be a positive number"
    });
  }

  if (imageUrl === undefined || imageUrl === null || String(imageUrl).trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: imageUrl - Image URL cannot be empty"
    });
  }

  if (stock === undefined || stock === null || isNaN(Number(stock)) || Number(stock) < 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: stock - Stock cannot be negative"
    });
  }

  if (category === undefined || category === null || String(category).trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: category - Category cannot be empty"
    });
  }

  next();
}

module.exports = {
  validateLogin,
  validateSignup,
  validateProduct
};
