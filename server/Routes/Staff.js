const express = require("express");

const { body, validationResult } = require("express-validator");
const FetchUser = require("../middleware/FetchUser");
const Staff = require("../models/StaffSchema");
const cloudinary = require("../Cloudnary");

const router = express.Router();

//get Staff
router.get("/get-staffs", FetchUser, async (req, res) => {
  const user = req.user.id;
  const staff = await Staff.find({ userId: user });

  res.send(staff);
});

router.post(
  "/add-Staff",
  [
    body("name", "Enter your proper full name").isLength({ min: 3 }),
    body("gender", "Enter gender").exists(),
    body("phone", "Enter phone number").isNumeric(),
    body("dob", "Enter Your birth date").isLength({ min: 3 }),
    body("city", "Enter a valid city").isLength({ min: 3 }),
    body("country", "Enter Your country").isLength({ min: 2 }),
    body("department", "Enter your department").isLength({ min: 1 }),
    body("email", "Enter a valid email").isEmail(),
    body("date_of_join", "Enter a date of your joining").isLength({ min: 3 }),
    body("state", "Enter a valid state e.g WestBengal").isLength({ min: 1 }),
    body("address", "Enter your address").isLength({ min: 5 }),
  ],
  FetchUser,
  async (req, res) => {
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

      // Initialize the new staff object without the photo details
      const data = new Staff({
        name,
        gender,
        phone,
        dob,
        city,
        country,
        department,
        email,
        photo: { public_id: '', url: '' }, // Initialize with empty strings
        date_of_join,
        state,
        address,
        userId: req.user.id,
      });

      // Upload the photo to Cloudinary
      cloudinary.uploader
        .upload(photo, {
          upload_preset: 'employee_data',
          public_id: `employees_img${data.id}`,
          allowed_formats: ['png', 'jpg', 'jpeg', 'webp', 'svg'],
        })
        .then(async (result) => {
          
          
          // Set the photo public_id and url in the staff data
          data.photo.public_id = result.public_id;
          data.photo.url = result.secure_url;

          // Save the staff data with the photo details
          await data.save();

          success = true;
          res.json({ success, data });
        })
        .catch((error) => {
          console.error("Error uploading image", error);
          res.status(500).json({
            Success: success,
            errors: `Unexpected Error Occurred: ${error.message}`,
          });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        Success: success,
        errors: `Unexpected Error Occurred: ${error.message}`,
      });
    }
  }
);


//edit Staff
router.put(
  "/edit-Staff/:id",
  [
    body("name", "Enter your proper full name").isLength({ min: 3 }),
    body("gender", "Enter gender").exists(),
    body("phone", "Enter phone number").isNumeric(),
    body("dob", "Enter Your birth date").isLength({ min: 3 }),
    body("city", "Enter a valid city").isLength({ min: 3 }),
    body("country", "Enter Your country").isLength({ min: 2 }),
    body("department", "Enter your department").isLength({ min: 1 }),
    body("email", "Enter a valid email").isEmail(),
    body("date_of_join", "Enter a date of your joining").isLength({ min: 3 }),
    body("state", "Enter a valid state e.g WestBengal").isLength({ min: 1 }),
    body("address", "Enter your address").isLength({ min: 5 }),
  ],
  FetchUser,
  async (req, res) => {
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

      // Find the existing staff record
      const staff = await Staff.findById(req.params.id);
      if (!staff) {
        return res.status(404).json({ errors: "Staff not found" });
      }

      // Object to hold updated fields
      const newDept = {};
      if (name) {
        newDept.name = name;
      }
      if (gender) {
        newDept.gender = gender;
      }
      if (phone) {
        newDept.phone = phone;
      }
      if (dob) {
        newDept.dob = dob;
      }
      if (city) {
        newDept.city = city;
      }
      if (country) {
        newDept.country = country;
      }
      if (department) {
        newDept.department = department;
      }
      if (email) {
        newDept.email = email;
      }
      if (date_of_join) {
        newDept.date_of_join = date_of_join;
      }
      if (state) {
        newDept.state = state;
      }
      if (address) {
        newDept.address = address;
      }

      // Handle photo update if provided
      if (photo) {
        // Delete the old image from Cloudinary
        if (staff.photo.public_id) {
          await cloudinary.uploader.destroy(staff.photo.public_id);
        }

        // Upload the new image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(photo, {
          upload_preset: 'employee_data',
          public_id: `employees_img${staff._id}`,
          allowed_formats: ['png', 'jpg', 'jpeg', 'webp', 'svg'],
        });

        // Update the photo details in the staff record
        newDept.photo = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
      }

      // Update the staff record with new details
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
  }
);




//delete Staff
router.delete("/delete-Staff/:id", FetchUser, async (req, res) => {
  let success = false;
  try {
    const userId = req.params.id;
    const staffData = await Staff.findById(userId);
    if (!staffData) {
      return res.status(404).json({ errors: "Staff not found" });
    }

    // Extract the public_id from the staffData
    const public_id = staffData.photo.public_id;

    // Delete the image from Cloudinary
    cloudinary.uploader.destroy(public_id, async (error, result) => {
      if (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return res.status(500).json({
          success: success,
          errors: `Unexpected Error Occurred: ${error.message}`,
        });
      }

      
      const delStaff = await Staff.findByIdAndDelete(userId);
      success = true;
      res.json({ success, message: "Staff and associated image deleted", Staff: delStaff });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
});

module.exports = router;
