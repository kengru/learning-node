const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  let isLoggedIn = false;
  isLoggedIn = req.session.isLoggedIn;
  // console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5ca8c448236723155c51a808")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(error => {
        res.redirect("/");
      })
    })
    .catch(error => console.log(error));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
