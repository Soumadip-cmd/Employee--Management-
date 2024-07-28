const express = require("express");
const FetchUser = require("../middleware/FetchUser");
const { body, validationResult } = require("express-validator");
const Admin = require("../models/AdminSchema");
const cloudinary = require("../Cloudnary");

const router = express.Router();

// Get all admins
router.get("/get-admins", FetchUser, async (req, res) => {
  try {
    const admins = await Admin.find({ userId: req.user.id });
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Success: false, msg: `Error Occurred: ${error.message}` });
  }
});

// Add admin
router.post(
  "/add-admin",
  [
    body("name", "Enter Full name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  FetchUser,
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, photo, email } = req.body;
      const emailExist = await Admin.findOne({ email });

      if (emailExist) {
        return res.status(400).json({ success, msg: "Email Already Exists!" });
      }

      const admin = new Admin({
        name,
        photo: { public_id: "", url: "" },
        email,
        userId: req.user.id,
      });

      const uploadResult = await cloudinary.uploader.upload(photo, {
        upload_preset: "employee_data",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "webp"],
        public_id: `Admin_img${admin.id}`,
      });

      if (uploadResult) {
        admin.photo.public_id = uploadResult.public_id;
        admin.photo.url = uploadResult.secure_url;

        const adminDetails = await admin.save();
        success = true;
        return res.status(201).json({ success, adminDetails });
      }

      return res
        .status(404)
        .json({ success, error: "Error Occurred, Photo Not Uploaded" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, msg: `Error Occurred: ${error.message}` });
    }
  }
);

// Edit admin
router.put("/edit-admin/:id", FetchUser, async (req, res) => {
  let success = false;
  try {
    const { name, email, photo } = req.body;
    const userId = req.user.id;
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res
        .status(404)
        .json({ Success: success, msg: "Admin does not exist" });
    }

    if (admin.userId.toString() !== userId) {
      return res.status(403).json({ Success: success, msg: "Not allowed" });
    }

    const newAdmin = {};
    if (name) newAdmin.name = name;
    if (email) newAdmin.email = email;
    if (photo) {
      if (photo.public_id) {
        await cloudinary.uploader.destroy(photo.public_id);
      }

      const uploadResult = await cloudinary.uploader
        .upload(photo, {
          upload_preset: "employee_data",
          allowed_formats: ["png", "jpg", "jpeg", "svg", "webp"],
          public_id: `Admin_img${admin.id}`,
        })
        .catch((error) => {
          console.log(error);
        });

      photo.public_id = uploadResult.public_id;
      photo.url = uploadResult.secure_url;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: newAdmin },
      { new: true }
    );

    success = true;
    res.status(200).json({ Success: success, updatedAdmin });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Success: false, msg: `Error Occurred: ${error.message}` });
  }
});

// Delete admin
router.delete("/delete-admin/:id", FetchUser, async (req, res) => {
  let success = false;
  try {
    const user = req.params.id;
    const userId = req.user.id;
    const adminExist = await Admin.findById(user);

    if (!adminExist) {
      return res
        .status(404)
        .json({ success: false, msg: "Admin does not exist" });
    }

    if (adminExist.userId.toString() !== userId) {
      return res.status(403).json({ success: false, msg: "Not allowed" });
    }

    await cloudinary.uploader.destroy(adminExist.photo.public_id);

    const delAdmin = await Admin.findByIdAndDelete(req.params.id);
    success = true;
    res.status(200).json({ success, delAdmin });
    
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, msg: `Error Occurred: ${error.message}` });
  }
});


module.exports = router;
