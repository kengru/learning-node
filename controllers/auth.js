const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGrid = require("nodemailer-sendgrid");
require("dotenv").config();

const User = require("../models/user");

const transporter = nodemailer.createTransport(
  sendGrid({
    apiKey:
      process.env.SENDGRID_KEY
  })
);

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: req.flash("error")
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: req.flash("error")
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then(equal => {
          if (equal) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(error => {
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch(error => {
          console.log(error);
          res.redirect("/login");
        });
    })
    .catch(error => console.log(error));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then(uExist => {
      if (uExist) {
        req.flash("error", "Email already exists.");
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
          transporter.sendMail({
            to: email,
            from: "shop@lnode.com",
            subject: "Signup succeeded!",
            html: "<h1>You have signed in!</h1>"
          });
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
