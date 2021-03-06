const Product = require("../models/product");
const { validationResult } = require("express-validator/check");

const fileHelper = require("../util/file");

const ITEMS_PER_PAGE = 3;

exports.getAdminProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.find({ userId: req.user._id })
    .countDocuments()
    .then(numberProducts => {
      totalItems = numberProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: req.flash("error"),
    validationErrors: []
  });
};

exports.postAddProduct = (req, res) => {
  const { title, price, description } = req.body;
  const image = req.file;
  const errors = validationResult(req);
  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description
      },
      errorMessage: "Attached file is not an image.",
      validationErrors: []
    });
  }
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const imageUrl = image.path;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(res.redirect("/admin/products"))
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
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
        product: product,
        hasError: false,
        errorMessage: req.flash("error"),
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, description } = req.body;
  const image = req.file;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description,
        _id: productId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  if (image) {
    const imageUrl = image.path;
    Product.findById(productId)
      .then(product => {
        fileHelper.deleteFile(product.imageUrl);
      })
      .catch(err => next(err));
    Product.findByIdAndUpdate(productId, {
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl
    })
      .then(res.redirect("/admin/products"))
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  } else {
    Product.findByIdAndUpdate(productId, {
      title: title,
      price: price,
      description: description
    })
      .then(res.redirect("/admin/products"))
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  }
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return next(new Error("Product not found."));
      }
      if (fileHelper.checkFile(product.imageUrl)) {
        fileHelper.deleteFile(product.imageUrl);
      }
      return Product.deleteOne({ _id: productId, userId: req.user._id });
    })
    .then(() => {
      res.status(200).json({ message: "Success!" });
    })
    .catch(err => {
      res.status(500).json({ message: "Deleting product failed!" });
    });
};
