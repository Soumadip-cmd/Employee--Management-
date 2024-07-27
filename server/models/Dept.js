//Department Schema

const mongoose = require("mongoose");
const { Schema } = mongoose;

const DeptSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", 
  },
  employeeId: {
    type: String,
    required: true,
  },
  deptName: {
    type: String,
    required: true,
    // unique:true
  },
});

const dept = mongoose.model("department", DeptSchema);
module.exports = dept;
