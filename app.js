const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = 3000;

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5ca8c448236723155c51a808")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(error => console.log(error));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Updating mongoose variables to remove uneventful warnings.
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Connecting to the mongo database.
mongoose
  .connect(
    "mongodb+srv://shnode:reflexes@l-node-psbai.mongodb.net/shop?retryWrites=true"
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Ken",
          email: "ken@gru.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    console.log("Listening at port:", PORT);
    app.listen(PORT);
  })
  .catch(error => console.log(error));
