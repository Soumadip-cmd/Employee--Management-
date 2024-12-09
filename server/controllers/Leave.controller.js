// controllers/StaffLeave.controller.js
const Leave = require("../models/LeaveSchema");

// Get staff leaves
const getStaffLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ staffId: req.staff.id })
      .populate("staffId", "name email department photo")
      .sort({ created_at: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Add leave request
const addLeave = async (req, res) => {
  try {
    const { reason, start, end, description } = req.body;

    const leave = new Leave({
      staffId: req.staff.id,
      userId: req.staff.userId, // Including userId from staff record
      reason,
      start,
      end,
      description,
    });

    await leave.save();

    // Populate staff details before sending response
    const populatedLeave = await Leave.findById(leave._id).populate(
      "staffId",
      "name email department photo"
    );

    res.json({ success: true, leave: populatedLeave });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Edit leave request
const editLeave = async (req, res) => {
  try {
    const { reason, start, end, description } = req.body;

    // Find leave and verify ownership
    const leave = await Leave.findOne({
      _id: req.params.id,
      staffId: req.staff.id,
    });

    if (!leave) {
      return res.status(404).json({ msg: "Leave not found or unauthorized" });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({ msg: "Can only edit pending leaves" });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { reason, start, end, description },
      { new: true }
    ).populate("staffId", "name email department photo");

    res.json({ success: true, leave: updatedLeave });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Delete leave request
const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findOne({
      _id: req.params.id,
      staffId: req.staff.id,
    });

    if (!leave) {
      return res.status(404).json({ msg: "Leave not found or unauthorized" });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({ msg: "Can only delete pending leaves" });
    }

    await Leave.findByIdAndDelete(req.params.id);
    res.json({ success: true, msg: "Leave deleted" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Admin controllers
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id })
      .populate("staffId", "name email department photo")
      .sort({ created_at: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const leave = await Leave.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!leave) {
      return res.status(404).json({ msg: "Leave not found or unauthorized" });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("staffId", "name email department photo");

    res.json({ success: true, leave: updatedLeave });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

module.exports = {
  updateLeaveStatus,
  getAllLeaves,
  deleteLeave,
  editLeave,
  addLeave,
  getStaffLeaves,
};
