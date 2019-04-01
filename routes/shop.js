const path = require("path");
const express = require("express");

const productController = require("../controllers/product");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", productController.getAllProducts);
router.get('/products/:productId', productController.getProduct);
router.get("/cart", shopController.getCart);
router.get("/orders", shopController.getOrders);
router.get("/checkout", shopController.getCheckout);

module.exports = router;
