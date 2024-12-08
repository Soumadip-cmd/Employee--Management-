const { validationResult } = require("express-validator");
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

// Get all leaves (for admin)
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('userId', 'name email')
      .populate('reviewedBy', 'name email');
    res.json(leaves);
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
      status: 'pending'  // Set initial status
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

// Review leave (approve/reject) - Admin only
const reviewLeave = async (req, res) => {
  let success = false;
  try {
    const { status, comments } = req.body;
    
    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        success, 
        errors: "Invalid status. Must be 'approved' or 'rejected'" 
      });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ errors: "Leave not found" });
    }

    // Update leave status
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status: status,
        reviewedBy: req.user.id,
        reviewedAt: Date.now(),
        reviewComments: comments || ''
      },
      { new: true }
    ).populate('userId', 'name email')
     .populate('reviewedBy', 'name email');

    success = true;
    res.json({ success, leave: updatedLeave });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success,
      errors: `Unexpected Error Occurred: ${error.message}`,
    });
  }
};

// Edit an existing leave (only if status is pending)
const editLeave = async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ errors: "Leave not found" });
    }

    // Only allow editing if leave is still pending
    if (leave.status !== 'pending') {
      return res.status(400).json({ 
        success,
        errors: "Cannot edit leave that has already been reviewed" 
      });
    }

    const { reason, start, end, description } = req.body;
    const updatedLeave = {};

    if (reason) updatedLeave.reason = reason;
    if (start) updatedLeave.start = start;
    if (end) updatedLeave.end = end;
    if (description) updatedLeave.description = description;

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

// Delete a leave (only if status is pending)
const deleteLeave = async (req, res) => {
  let success = false;
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ errors: "Leave not found" });
    }

    // Only allow deletion if leave is still pending
    if (leave.status !== 'pending') {
      return res.status(400).json({ 
        success,
        errors: "Cannot delete leave that has already been reviewed" 
      });
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

module.exports = { 
  getLeaves, 
  getAllLeaves,
  addLeave, 
  editLeave, 
  deleteLeave,
  reviewLeave 
};