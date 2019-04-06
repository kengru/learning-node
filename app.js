const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = 3000;

const errorController = require("./controllers/error");
// const User = require("./models/user");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("5ca7672ecae63932b4d28e63")
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(error => console.log(error));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://shnode:reflexes@l-node-psbai.mongodb.net/shop?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(result => {
    console.log("Listening at port:", PORT);
    app.listen(PORT);
  })
  .catch(error => console.log(error));
