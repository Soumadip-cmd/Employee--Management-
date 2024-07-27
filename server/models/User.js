//login,signup Schema

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  Fname: {
    type: String,
    required: true,
  },
  Lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default:Date.now
  },
});

module.exports = mongoose.model("user", userSchema);
