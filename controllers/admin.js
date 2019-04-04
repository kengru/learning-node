const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.desc;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(res.redirect("/admin/products"))
    .catch(error => console.log(error));
};

// exports.getEditProduct = (req, res) => {
//   const editMode = req.query.edit;
//   if (!editMode) return res.redirect("/");
//   const prodId = req.params.productId;
//   req.user
//     .getProducts({ where: { id: prodId } })
//     .then(products => {
//       const product = products[0];
//       if (!product) return res.redirect("/");
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product
//       });
//     })
//     .catch(error => console.log(error));
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const upTitle = req.body.title;
//   const upImageUrl = req.body.imageUrl;
//   const upPrice = req.body.price;
//   const upDesc = req.body.desc;
//   Product.findByPk(prodId)
//     .then(product => {
//       product.title = upTitle;
//       product.imageUrl = upImageUrl;
//       product.price = upPrice;
//       product.description = upDesc;
//       return product.save();
//     })
//     .then(result => {
//       console.log("UPDATED PRODUCT");
//       res.redirect("/admin/products");
//     })
//     .catch(error => console.log(error));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then(product => {
//       return product.destroy();
//     })
//     .then(result => {
//       res.redirect("/admin/products");
//     })
//     .catch(error => console.log(error));
// };

// exports.getAdminProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     .then(products => {
//       res.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "admin/products"
//       });
//     })
//     .catch(error => console.log(error));
// };
