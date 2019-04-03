const Product = require("../models/product");

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product.title
      });
    })
    .catch(error => console.log(error));
};

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fields]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Products",
        path: "/products"
      });
    })
    .catch(error => console.log(error));
};
