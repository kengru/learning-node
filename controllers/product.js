const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products"
    });
  });
};
