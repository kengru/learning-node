const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5ca8c448236723155c51a808")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(error => {
        res.redirect("/");
      });
    })
    .catch(error => console.log(error));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then(uExist => {
      if (uExist) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect("/login");
        });
    })
    .catch(error => console.log(error));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
