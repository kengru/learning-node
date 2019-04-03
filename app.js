const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const ProductModel = require("./models/product");
const UserModel = require("./models/user");
const CartModel = require("./models/cart");
const CartItemModel = require("./models/cart-item");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  UserModel.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(error => console.log(error));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

ProductModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(ProductModel);
UserModel.hasOne(CartModel);
CartModel.belongsTo(UserModel);
CartModel.belongsToMany(ProductModel, { through: CartItemModel });
ProductModel.belongsToMany(CartModel, { through: CartItemModel });

sequelize
  // .sync({force: true})
  .sync()
  .then(result => {
    return UserModel.findByPk(1);
  })
  .then(user => {
    if (!user) {
      UserModel.create({ name: "Ken", email: "ken@gru.com" });
    }
    return Promise.resolve(user);
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    console.log("Listening at port:", PORT);
    app.listen(PORT);
  })
  .catch(error => console.log(error));
