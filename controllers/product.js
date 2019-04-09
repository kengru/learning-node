const Product = require("../models/product");

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(error => console.log(error));
};

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(error => console.log(error));
};
