const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-learn", "root", "reflejo99", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
