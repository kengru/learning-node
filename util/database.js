const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://shnode:reflexes@l-node-psbai.mongodb.net/test?retryWrites=true"
  )
    .then(client => {
      console.log("Connected to Atlas.");
      callback(client);
    })
    .catch(error => console.log(error));
};

module.exports = mongoConnect;
