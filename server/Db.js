const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://soumadipsantra2004:employeePass123@employee.dqxkva4.mongodb.net/";

const connectToMongo = async () => {
  mongoose.connect(mongoUrl);
  console.log("database Connected..");
};

module.exports = connectToMongo;
