const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSch = new Schema({
  user: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model("Order", orderSch, "orders");
