const { validationResult } = require("express-validator");
const Salary = require("../models/SalSchema");

// Get all salary records for a user
const getSalary = async (req, res) => {
  try {
    const user = req.user.id;
    const salary = await Salary.find({ userId: user });
    res.send(salary);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Add a salary record
const addSalary = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { StaffName, department, Paid_Salary } = req.body;
    const data = new Salary({
      StaffName,
      department,
      Paid_Salary,
      userId: req.user.id,
    });

    await data.save();
    success = true;
    res.json({ success, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
};

// Edit an existing salary record
const editSalary = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { StaffName, department, Paid_Salary } = req.body;
    const newSal = {};

    if (StaffName) newSal.StaffName = StaffName;
    if (department) newSal.department = department;
    if (Paid_Salary) newSal.Paid_Salary = Paid_Salary;

    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ errors: "Salary not found" });
    }

    const updated = await Salary.findByIdAndUpdate(
      req.params.id,
      { $set: newSal },
      { new: true }
    );

    success = true;
    res.json({ success, updated });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
};

// Delete a salary record
const deleteSalary = async (req, res) => {
  let success = false;
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ errors: "Salary not found" });
    }

    const deleted = await Salary.findByIdAndDelete(req.params.id);
    success = true;
    res.json({ success, details: "Data Deleted", salary: deleted });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
};

module.exports = { getSalary, addSalary, editSalary, deleteSalary };
