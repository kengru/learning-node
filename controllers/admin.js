const Product = require("../models/product");

exports.getAdminProducts = (req, res, next) => {
  Product.find()
    .populate("userId", "name")
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(error => console.log(error));
};

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res) => {
  const { title, price, desc, imageUrl } = req.body;
  const product = new Product({
    title: title,
    price: price,
    description: desc,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(res.redirect("/admin/products"))
    .catch(error => console.log(error));
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) return res.redirect("/");
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      });
    })
    .catch(error => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, desc, imageUrl } = req.body;
  Product.findByIdAndUpdate(productId, {
    title: title,
    price: price,
    description: desc,
    imageUrl: imageUrl
  })
    .then(res.redirect("/admin/products"))
    .catch(error => console.log(error));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch(error => console.log(error));
};
