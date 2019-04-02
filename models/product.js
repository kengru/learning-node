const db = require("../util/database");
const Cart = require("./cart");

const getProductsFromFile = cb => {
  fs.readFile(p, (error, data) => {
    if (error) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, desc) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = desc;
  }

  save() {
    
  }

  static fetchAll() {
    return db.execute("select * from products");
  }

  static findById(id) {
  }

  static deleteById(id) {
  }
};
