const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
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
    // Make this optional for OAuth users
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  googleId: {
    type: String,
    unique: true,
  },
  facebookId: {
    type: String,
    default:null
  },
});

module.exports = mongoose.model("UserLeave", userSchema);
