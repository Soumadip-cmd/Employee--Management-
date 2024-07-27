const express = require("express");
const FetchUser = require("../middleware/FetchUser");
const { body, validationResult } = require("express-validator");
const Admin = require("../models/AdminSchema");

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
        return res.status(400).json({ Success:success, msg: "Email Already Exists!" });
      }

      const admin = new Admin({
        name,
        photo,
        email,
        userId: req.user.id,
      });

      const adminDetails = await admin.save();

      success = true;
      res.status(201).json({ Success:success, adminDetails });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ Success: false, msg: `Error Occurred: ${error.message}` });
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
      return res.status(404).json({ Success:success, msg: "Admin does not exist" });
    }

    if (admin.userId.toString() !== userId) {
      return res.status(403).json({ Success:success, msg: "Not allowed" });
    }

    const newAdmin = {};
    if (name) newAdmin.name = name;
    if (photo) newAdmin.photo = photo;
    if (email) newAdmin.email = email;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: newAdmin },
      { new: true }
    );

    success = true;
    res.status(200).json({ Success:success, updatedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Success: false, msg: `Error Occurred: ${error.message}` });
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
      return res.status(404).json({ Success: false, msg: "Admin does not exist" });
    }
    if (adminExist.userId.toString() !== userId) {
      return res.status(403).json({ Success: false, msg: "Not allowed" });
    }

    const delAdmin = await Admin.findByIdAndDelete(req.params.id);
    success = true;
    res.status(200).json({ Success:success, delAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Success: false, msg: `Error Occurred: ${error.message}` });
  }
});

module.exports = router;
