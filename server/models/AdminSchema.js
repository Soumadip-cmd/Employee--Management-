const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Ensure the reference matches the User model name
    
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Consider adding unique constraint if emails must be unique
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Admin', AdminSchema);
