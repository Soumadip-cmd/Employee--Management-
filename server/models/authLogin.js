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
    // required: true,
  },
  avatar: {
    url: {
      type: String,
      default: "", // default to an empty string or a placeholder URL
    },
    public_id: {
      type: String,
    },
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  googleId: {
    type: String,
    unique: true,
  },
  facebookId: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("user", userSchema);
