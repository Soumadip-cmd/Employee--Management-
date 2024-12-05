const User = require("../../models/User");
const {  validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const cloudinary = require("../../Cloudnary");

const jwt_Secret = process.env.JWT_SECRET;


// Get all admin
const getAllAdmin = async (req, res) => {
  let success = false;
  try {
    const allAdmin = await User.find();
    success = true;
    res.json({ Success: success, allAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success, msg: `Internal Server Error: ${error.message}` });
  }
};

// Create user
const createUser = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { name, email, password, avatar } = req.body;

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ success, msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: secpass,
      avatar: { public_id: "", url: "" },
    });

    if (avatar) {
      try {
        const uploadResult = await cloudinary.uploader.upload(avatar, {
          upload_preset: "employee_data",
          public_id: `employees_avatar_${user.id}`,
          allowed_formats: ["png", "jpg", "jpeg", "webp", "svg"],
        });

        user.avatar = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
      } catch (uploadError) {
        return res.status(500).json({
          success,
          msg: `Error uploading image to Cloudinary: ${uploadError.message}`,
        });
      }
    } else {
      user.avatar = {
        public_id: "default_placeholder",
        url: "https://via.placeholder.com/150",
      };
    }

    await user.save();

    success = true;
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, jwt_Secret);
    res.json({ success, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success, msg: `Internal Server Error: ${error.message}` });
  }
};

// Login user
const loginUser = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Success: success, errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ Success: success, errors: "Invalid Authentication..!" });
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(404).json({ Success: success, errors: "Invalid Authentication..!" });
    }

    success = true;
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, jwt_Secret);
    const adminData = await User.findOne({ email }).select("-_id -password");

    res.json({ Success: success, adminData, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Success: success, msg: `Internal Server Error: ${error.message}` });
  }
};

// Get user
const getUser = async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const data = await User.findById(userId).select("-password");
    success = true;
    res.json({ Success: success, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Success: success, msg: `Internal Server Error: ${error.message}` });
  }
};

// Edit admin
const editAdmin = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success, msg: "User not found." });
    }

    const { name, email } = req.body;
    const newAdmin = {};

    if (name) newAdmin.name = name;

    if (email) {
      const emailCheck = await User.findOne({ email });
      if (emailCheck && emailCheck.id !== req.params.id) {
        return res.status(400).json({ success, msg: "Email already exists." });
      }
      newAdmin.email = email;
    }

    const updatedAdmin = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newAdmin },
      { new: true }
    );

    success = true;
    res.json({ success, updatedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success, msg: `Internal Server Error: ${error.message}` });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  let success = false;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success, msg: "User not found." });
    }

    const public_id = user.avatar.public_id;
    await cloudinary.uploader.destroy(public_id);
    await User.findByIdAndDelete(req.params.id);
    
    success = true;
    res.json({ success, msg: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success, msg: `Internal Server Error: ${error.message}` });
  }
};

// Update user details
const updateDetails = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Success: success, errors: errors.array() });
    }

    const { avatar, name, password } = req.body;
    const newUserDetails = {};

    const userExists = await User.findById(req.params.id);
    if (!userExists) {
      return res.status(404).json({ Success: success, Error: "User Not Exists.." });
    }

    if (name) newUserDetails.name = name;

    if (password) {
      const hashPass = await bcrypt.genSalt(10);
      newUserDetails.password = await bcrypt.hash(password, hashPass);
    }

    if (avatar) {
      if (userExists.avatar.public_id) {
        await cloudinary.uploader.destroy(userExists.avatar.public_id);
      }
      try {
        const uploadResult = await cloudinary.uploader.upload(avatar, {
          upload_preset: "employee_data",
          public_id: `user_img${userExists.id}`,
          allowed_formats: ["png", "jpg", "jpeg", "svg", "webp"],
        });

        newUserDetails.avatar = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
      } catch (uploadError) {
        return res.status(500).json({
          Success: success,
          msg: `Avatar Error: ${uploadError.message}`,
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUserDetails },
      { new: true }
    );

    success = true;
    res.json({ Success: success, updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Success: success,
      msg: `Internal Server Error: ${error.message}`,
    });
  }
};

// Reset password GET
const getResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const oldUser = await User.findOne({ _id: id });
    
    if (!oldUser) {
      return res.status(404).json({ msg: "User Not Exists", status: "Not Verified" });
    }
    
    const verify = jwt.verify(token, jwt_Secret);
    res.render("reset-password", {
      userName: oldUser.name,
      email: verify.email,
      status: "Not Verified"
    });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

// Reset password POST
const postResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.status(404).json({ msg: "User Not Exists", status: "Not Verified" });
    }

    const verify = jwt.verify(token, jwt_Secret);
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(password, salt);

    await User.updateOne(
      { _id: id },
      { $set: { password: secpass } }
    );

    res.render("reset-password", {
      userName: oldUser.name,
      email: verify.email,
      status: "verified"
    });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

// Forget password
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const oldPassword = await User.findOne({ email: email });
    if (!oldPassword) {
      return res.status(404).json({ msg: "User Not Exists", status: "Not Verified" });
    }

    const token = jwt.sign(
      { data: oldPassword._id },
      jwt_Secret,
      { expiresIn: "1h" }
    );

    const link = `https://employee-management-qwn3.onrender.com/reset-password/${oldPassword._id}/${token}`;
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });
    
    const mailOptions = {
      from: 'soumadipsantra2004@gmail.com',
      to: email,
      subject: 'Reset Your Password From Employee Management System!!...',
      text: `Click the Link\n${link}`
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ msg: 'Email sent: ' + info.response });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error });
  }
};

// Test EJS
const testEjs = (req, res) => {
  res.render("test", { message: "EJS is working!" });
};


module.exports = {
  getAllAdmin,
  createUser,
  loginUser,
  getUser,
  editAdmin,
  deleteAdmin,
  updateDetails,
  getResetPassword,
  postResetPassword,
  forgetPassword,
  testEjs,
};