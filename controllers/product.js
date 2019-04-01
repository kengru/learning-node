const Product = require("../models/product");

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render("shop/product-detail", { product: product, pageTitle: product.title });
  });
};

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products"
    });
  });
};
