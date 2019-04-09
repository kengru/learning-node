const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = require("./order");

//TODO: Add price to cart and then to orders.

const userSch = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSch.methods.addToCart = function(product) {
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  const cartProduct = this.cart.items.findIndex(cp => {
    return cp.product.toString() === product._id.toString();
  });
  if (cartProduct >= 0) {
    newQuantity = this.cart.items[cartProduct].quantity + 1;
    updatedCartItems[cartProduct].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      product: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;
  return this.save();
};

userSch.methods.removeFromCart = function(id) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId._id.toString() !== id.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSch.methods.addOrder = function() {
  const order = new Order({
    user: {
      name: this.name,
      userId: this._id
    },
    items: this.cart.items
  });
  return order.save().then(result => {
    this.cart.items = [];
    return this.save();
  });
};

module.exports = mongoose.model("User", userSch, "users");
