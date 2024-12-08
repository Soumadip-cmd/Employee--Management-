const {  validationResult } = require("express-validator");
const Leave = require("../models/LeaveSchema");

// Get all leaves for a user
const getLeaves = async (req, res) => {
  try {
    const user = req.user.id;
    const leave = await Leave.find({ userId: user });
    res.send(leave);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Add a new leave
const addLeave = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reason, start, end, description } = req.body;
    const data = new Leave({
      reason,
      start,
      end,
      description,
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

// Edit an existing leave
const editLeave = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reason, start, end, description } = req.body;
    const updatedLeave = {};

    if (reason) updatedLeave.reason = reason;
    if (start) updatedLeave.start = start;
    if (end) updatedLeave.end = end;
    if (description) updatedLeave.description = description;

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ errors: "Leave not found" });
    }

    const updated = await Leave.findByIdAndUpdate(
      req.params.id,
      { $set: updatedLeave },
      { new: true }
    );

    success = true;
    res.json({ success, updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
};

// Delete a leave
const deleteLeave = async (req, res) => {
  let success = false;
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ errors: "Leave not found" });
    }

    const deleted = await Leave.findByIdAndDelete(req.params.id);
    success = true;
    res.json({ success, details: "Data Deleted", leave: deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
};

module.exports = { getLeaves, addLeave, editLeave, deleteLeave };
