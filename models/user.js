const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSch = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
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
    return cp.productId.toString() === product._id.toString();
  });
  if (cartProduct >= 0) {
    newQuantity = this.cart.items[cartProduct].quantity + 1;
    updatedCartItems[cartProduct].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
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

module.exports = mongoose.model("User", userSch, "users");

// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // {items: []}
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db
//       .collection("users")
//       .insertOne(this)
//       .catch(error => console.log(error));
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             email: this.email
//           }
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then(result => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": new mongodb.ObjectId(this._id) })
//       .toArray();
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new mongodb.ObjectId(userId) })
//       .then(user => user)
//       .catch(error => console.log(error));
//   }
// }

// module.exports = User;
