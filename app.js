const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // UserModel.findByPk(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(error => console.log(error));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(client => {
  console.log("Listening at port:", PORT);
  app.listen(PORT);
});
