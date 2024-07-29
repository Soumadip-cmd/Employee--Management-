const express = require("express");
const { body, validationResult } = require("express-validator");
const Admin = require("../models/AdminSchema");
const cloudinary = require("../Cloudnary");

const router = express.Router();

// Get all admins
router.get("/get-admins", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, msg: `Error Occurred: ${error.message}` });
  }
});

router.post(
  "/add-admin",
  [
    body("name", "Enter Full name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, photo, email } = req.body;

      // Check if photo is a base64 string
      if (!photo || typeof photo !== 'string' || !photo.startsWith('data:image/')) {
        return res.status(400).json({ success: false, msg: "Invalid photo format" });
      }

      const emailExist = await Admin.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ success, msg: "Email Already Exists!" });
      }

      const admin = new Admin({
        name,
        photo: { public_id: "", url: "" },
        email,
      });

      // Upload photo to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(photo, {
        upload_preset: "employee_data",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "webp"],
        public_id: `Admin_img${admin._id}`,
      });

      if (uploadResult) {
        admin.photo.public_id = uploadResult.public_id;
        admin.photo.url = uploadResult.secure_url;

        const adminDetails = await admin.save();
        success = true;
        return res.status(201).json({ success, adminDetails });
      }

      return res.status(404).json({ success, error: "Photo Not Uploaded" });
    } catch (error) {
      console.error("Error during upload:", error);
      return res
        .status(500)
        .json({ success: false, msg: `Error Occurred: ${error.message}` });
    }
  }
);

// Edit admin
router.put("/edit-admin/:id", async (req, res) => {
  let success = false;
  try {
    const { name, email, photo } = req.body;
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, msg: "Admin does not exist" });
    }

    const newAdmin = {};
    if (name) newAdmin.name = name;
    if (email) newAdmin.email = email;
    if (photo) {
      if (admin.photo.public_id) {
        await cloudinary.uploader.destroy(admin.photo.public_id);
      }

      const uploadResult = await cloudinary.uploader.upload(photo, {
        upload_preset: "employee_data",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "webp"],
        public_id: `Admin_img${admin.id}`,
      });

      newAdmin.photo = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: newAdmin },
      { new: true }
    );

    success = true;
    res.status(200).json({ success, updatedAdmin });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, msg: `Error Occurred: ${error.message}` });
  }
});

// Delete admin
router.delete("/delete-admin/:id", async (req, res) => {
  let success = false;
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, msg: "Admin does not exist" });
    }

    await cloudinary.uploader.destroy(admin.photo.public_id);

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
