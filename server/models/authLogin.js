const mongoose = require("mongoose");
const { Schema } = mongoose;

const authLogSchema = new Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
//     required: true,
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
    
  },
  facebookId: {
    type: String,
    
  },
});

module.exports = mongoose.model("user", authLogSchema);
