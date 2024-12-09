const { validationResult } = require("express-validator");
const Staff = require("../models/StaffSchema");
const cloudinary = require("../Cloudnary");
const jwt = require('jsonwebtoken');

// Get all staff
const getAllStaff = async (req, res) => {
  const user = req.user.id;
  const staff = await Staff.find({ userId: user });
  res.send(staff);
};

// Add new staff
const addStaff = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      gender,
      phone,
      dob,
      city,
      country,
      department,
      email,
      photo,
      date_of_join,
      state,
      address,
    } = req.body;

    const data = new Staff({
      name,
      gender,
      phone,
      dob,
      city,
      country,
      department,
      email,
      photo: { public_id: "", url: "" },
      date_of_join,
      state,
      address,
      userId: req.user.id,
    });

    const result = await cloudinary.uploader.upload(photo, {
      upload_preset: "employee_data",
      public_id: `employees_img${data.id}`,
      allowed_formats: ["png", "jpg", "jpeg", "webp", "svg"],
    });

    data.photo.public_id = result.public_id;
    data.photo.url = result.secure_url;

    await data.save();
    success = true;
    res.json({ success, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Success: success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
};

// Edit staff
const editStaff = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      gender,
      phone,
      dob,
      city,
      country,
      department,
      email,
      photo,
      date_of_join,
      state,
      address,
    } = req.body;

    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ errors: "Staff not found" });
    }

    const newDept = {
      name,
      gender,
      phone,
      dob,
      city,
      country,
      department,
      email,
      date_of_join,
      state,
      address,
    };

    if (photo) {
      if (staff.photo.public_id) {
        await cloudinary.uploader.destroy(staff.photo.public_id);
      }

      const uploadResult = await cloudinary.uploader.upload(photo, {
        upload_preset: "employee_data",
        public_id: `employees_img${staff._id}`,
        allowed_formats: ["png", "jpg", "jpeg", "webp", "svg"],
      });

      newDept.photo = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: newDept },
      { new: true }
    );

    success = true;
    res.json({ success, updatedStaff });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
};

// Delete staff
const deleteStaff = async (req, res) => {
  let success = false;
  try {
    const userId = req.params.id;
    const staffData = await Staff.findById(userId);
    if (!staffData) {
      return res.status(404).json({ errors: "Staff not found" });
    }

    const public_id = staffData.photo.public_id;
    await cloudinary.uploader.destroy(public_id);

    const delStaff = await Staff.findByIdAndDelete(userId);
    success = true;
    res.json({
      success,
      message: "Staff and associated image deleted",
      Staff: delStaff,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
};

const staffLogin = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find staff member using existing Staff model
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(404).json({ success: false, msg: "Staff not found" });
    }

    // Generate token
    const data = { staff: { id: staff._id } };
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ 
      success: true, 
      token,
      staff: {
        name: staff.name,
        email: staff.email,
        department: staff.department,
        photo: staff.photo.url
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const getStaff = async (req, res) => {
  let success = false;
  try {
    const staffId = req.staff.id;
    const data = await Staff.findById(staffId);
    
    if (!data) {
      return res.status(404).json({ success, msg: "Staff not found" });
    }
    
    success = true;
    res.json({ 
      success,
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success, msg: `Internal Server Error: ${error.message}` });
  }
};

const updateStaff = async (req, res) => {
  let success = false;
  try {
    const { name, photo } = req.body;

    // Find staff by ID
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ success, errors: "Staff not found" });
    }

    // Create update object with name
    const updateFields = {};
    if (name) {
      updateFields.name = name;
    }

    // Handle photo update if provided
    if (photo) {
      // Delete existing photo if it exists
      if (staff.photo.public_id) {
        await cloudinary.uploader.destroy(staff.photo.public_id);
      }

      // Upload new photo
      const uploadResult = await cloudinary.uploader.upload(photo, {
        upload_preset: "employee_data",
        public_id: `employees_img${staff._id}`,
        allowed_formats: ["png", "jpg", "jpeg", "webp", "svg"],
      });

      // Add photo data to update fields
      updateFields.photo = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    // Update staff with new data
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    success = true;
    res.json({ success, data: updatedStaff });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
};


module.exports = {
  getAllStaff,
  addStaff,
  editStaff,
  deleteStaff,
  staffLogin,
  getStaff,
  updateStaff,
};
