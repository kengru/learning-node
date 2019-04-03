const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(error => console.log(error));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => cart.getProducts())
    .then(products => {
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        cart: products
      });
    })
    .catch(error => console.log(error));
  // Cart.getProducts(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(p => p.id === product.id);
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQty = 1;
      if (product) {
      }
      return Product.findByPk(productId)
        .then(product => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQty }
          });
        })
        .catch(error => console.log(error));
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(error => console.log(error));
};

exports.postCartDelete = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};
