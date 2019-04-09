exports.getLogin = (req, res, next) => {
  let isLoggedIn = false;
  isLoggedIn = req.session.isLoggedIn
  // console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(error => {
    console.log(error);
    res.redirect("/");
  });
}
