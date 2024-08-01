const express = require("express");
const User = require("../../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FetchUser = require("../../middleware/FetchUser");
const cloudinary = require("../../Cloudnary");
const router = express.Router();
const jwt_Secret = process.env.JWT_SECRET;

//get-all-admin
router.get("/get-all-admin", async (req, res) => {
  let success = false;
  try {
    const allAdmin = await User.find();
    success = true;
    res.json({ Success: success, allAdmin });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success, msg: `Internal Server Error: ${error.message}` });
  }
});

// Create user
router.post(
  "/create-user",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password length must be at least 5 characters").isLength({
      min: 3,
    }),
    body("avatar", "Add a photo").optional().isLength({ min: 4 }),
  ],
  async (req, res) => {
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
          return res
            .status(500)
            .json({
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
      res
        .status(500)
        .json({ success, msg: `Internal Server Error: ${error.message}` });
    }
  }
);

// Login user
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Length must be at least 5 chars").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    let success = false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ Success: success, errors: errors.array() });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ Success: success, errors: "Invalid Authentication..!" });
      }

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return res
          .status(404)
          .json({ Success: success, errors: "Invalid Authentication..!" });
      }

      success = true;
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, jwt_Secret);
      const adminData = await User.findOne({ email }).select('-_id -password');

      res.json({ Success: success,adminData, token });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          Success: success,
          msg: `Internal Server Error: ${error.message}`,
        });
    }
  }
);

// Get user
router.get("/get-user", FetchUser, async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const data = await User.findById(userId).select("-password");
    success = true;
    res.json({ Success: success, data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        Success: success,
        msg: `Internal Server Error: ${error.message}`,
      });
  }
});

// Edit user
router.put(
  "/editAdmin/:id",
  [
    body("name", "Enter a valid username").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
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
          return res
            .status(400)
            .json({ success, msg: "Email already exists." });
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
      res
        .status(500)
        .json({ success, msg: `Internal Server Error: ${error.message}` });
    }
  }
);

// Delete user
router.delete("/deleteAdmin/:id", async (req, res) => {
  let success = false;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success, msg: "User not found." });
    }

    // Extract the public_id from the user
    const public_id = user.avatar.public_id;

    // Delete the image from Cloudinary
    cloudinary.uploader.destroy(public_id, async (error, result) => {
      if (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return res.status(500).json({
          success: success,
          errors: `Unexpected Error Occurred: ${error.message}`,
        });
      }
      await User.findByIdAndDelete(req.params.id);
      success = true;
      res.json({ success, msg: "User deleted successfully." });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success, msg: `Internal Server Error: ${error.message}` });
  }
});

router.put(
  "/updateDetails/:id",
  FetchUser,
  [
    body("name", "Enter Valid UserName").isLength({ min: 3 }),
    body("password", "Password Length must be at least 5 chars").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    let success = false;
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res
          .status(400)
          .json({ Success: success, errors: errors.array() });
      }

      const { avatar, name, password } = req.body;
      const newUserDetails = {};

      // Check if user exists
      const userExists = await User.findById(req.params.id);
      if (!userExists) {
        // console.log("User not found for ID:", req.params.id);
        return res
          .status(404)
          .json({ Success: success, Error: "User Not Exists.." });
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
          // console.log("Avatar uploaded successfully:", uploadResult);
        } catch (uploadError) {
          console.error("Avatar upload error:", uploadError.message);
          return res
            .status(500)
            .json({
              Success: success,
              msg: `Avatar Error: ${uploadError.message}`,
            });
        }
      }

      // Update user
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: newUserDetails },
        { new: true }
      );

      success = true;
      // console.log("User updated successfully:", updatedUser);
      res.json({ Success: success, updatedUser });
    } catch (error) {
      console.error("Internal Server Error:", error.message);
      res
        .status(500)
        .json({
          Success: success,
          msg: `Internal Server Error: ${error.message}`,
        });
    }
  }
);


module.exports = router;
