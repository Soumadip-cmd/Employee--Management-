const mongoose = require("mongoose");

const mongoUrl =
  process.env.MONGO_URL;

const connectToMongo = async () => {
  mongoose.connect(mongoUrl);
  console.log("database Connected..");
};

module.exports = connectToMongo;
