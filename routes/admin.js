const path = require("path");
const express = require("express");

const productController = require("../controllers/product");

const router = express.Router();

// /admin => GET
router.get("/add-product", productController.getAddProduct);
router.get("/products", productController.getAdminProducts);

// /admin => POST
router.post("/add-product", productController.postAddProduct);

module.exports = router;
