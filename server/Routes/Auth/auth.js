const express = require("express");
const User = require("../../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const FetchUser = require("../../middleware/FetchUser");
const cloudinary = require("../../Cloudnary");
const router = express.Router();
const jwt_Secret = process.env.JWT_SECRET;

//create admin
router.post(
  "/create-user",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password length must be at least 5 characters").isLength({
      min: 5,
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

      // Set default avatar if none is provided
      if (!avatar) {
        user.avatar = {
          public_id: "default_placeholder",
          url: "https://via.placeholder.com/150",
        };
      } else {
        // Upload avatar to Cloudinary
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
            .json({ success, msg: "Error uploading image to Cloudinary" });
        }
      }

      await user.save();

      success = true;
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, jwt_Secret);
      res.json({ success, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success,
        msg: `Internal Server Error: ${error.message}`,
      });
    }
  }
);


//login admin
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Length must be atleast 5 chars").isLength({
      min: 5,
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
      let user = await User.findOne({ email });
      if (!user) {
        res
          .status(404)
          .json({ Success: success, errors: "Invalid Authentication..!" });
      }

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        res
          .status(404)
          .json({ Success: success, errors: "Invalid Authentication..!" });
      }

      success = true;
      data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, jwt_Secret);
      res.json({ Success: success, token: token });

      //
    } catch (error) {
      console.error(error);
      res.status(500).json({
        Success: success,
        msg: `Internal Server Error: ${error.message}`,
      });
    }
  }
);

//get admin
router.get("/get-user", FetchUser, async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const data = await User.findById(userId).select("-password");
    success = true;
    res.json({ Success: success, Details: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Success: success,
      msg: `Internal Server Error: ${error.message}`,
    });
  }
});


// Edit admin
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

      if (name) {
        newAdmin.name = name;
      }

      if (email) {
        // Check if the email already exists but exclude the current user's email
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
      res.status(500).json({
        success,
        msg: `Internal Server Error: ${error.message}`,
      });
    }
  }
);


// Delete admin
router.delete('/deleteAdmin/:id', async (req, res) => {
  let success = false;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success, msg: "User not found." });
    }

    
    await User.findByIdAndDelete(req.params.id);
    success = true;
    res.json({ success, msg: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success,
      msg: `Internal Server Error: ${error.message}`,
    });
  }
});


//update avatar

router.put(
  "/updateDetails/:id",
  FetchUser,
  [
    body("name", "Enter Valid UserName").isLength({
      min: 3,
    }),
    body("password", "Password Length must be atleast 5 chars").isLength({
      min: 5,
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

      const { avatar, name, password } = req.body;
      const newUserDetails = {};

      const userExists = await User.findById(req.params.id);
      if (!userExists) {
        return res
          .status(404)
          .json({ Success: success, Error: "User Not Exists.." });
      }
      if (name) {
        newUserDetails.name = name;
      }
      const hashPass = await bcrypt.genSalt(10);
      const secret_pass = await bcrypt.hash(password, hashPass);

      if (password) {
        newUserDetails.password = secret_pass;
      }
      if (avatar) {
        if (userExists.avatar.public_id) {
          await cloudinary.uploader.destroy(userExists.avatar.public_id);
        }
        const uploadResult = await cloudinary.uploader
          .upload(avatar, {
            upload_preset: "employee_data",
            public_id: `user_img${userExists.id}`,
            allowed_formats: ["png", "jpg", "jpeg", "svg", "webp"],
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              Success: success,
              msg: `Avatar Error: ${error.message}`,
            });
          });

        // console.log(uploadResult);
        newUserDetails.avatar = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
      }
      success = true;
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: newUserDetails },
        { new: true }
      );

      res.json({ Success: success, updateUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        Success: success,
        msg: `Internal Server Error: ${error.message}`,
      });
    }
  }
);
module.exports = router;
