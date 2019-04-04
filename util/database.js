const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://shnode:reflexes@l-node-psbai.mongodb.net/shop?retryWrites=true",
    { useNewUrlParser: true }
  )
    .then(client => {
      console.log("Connected to Atlas.");
      _db = client.db();
      callback();
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
