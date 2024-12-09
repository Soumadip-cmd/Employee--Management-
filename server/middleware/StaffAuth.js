const jwt = require('jsonwebtoken');
const Staff = require('../models/StaffSchema');

const staffAuth = async (req, res, next) => {
  const token = req.header('staff-token');
  
  if (!token) {
    return res.status(401).json({ msg: "No token, staff authorization denied" });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const staff = await Staff.findById(verify.staff.id);
    if (!staff) {
      return res.status(401).json({ msg: "Staff not found" });
    }
    req.staff = {
      id: staff._id,
      userId: staff.userId
    };
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = staffAuth;
