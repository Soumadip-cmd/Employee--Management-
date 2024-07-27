// this is for apply leave (not for admin)
const express = require("express");

const { body, validationResult } = require("express-validator");
const FetchUser = require("../middleware/FetchUser");
const Leave = require("../models/LeaveSchema");

const router = express.Router();

//get Leave
router.get("/get-Leaves", FetchUser, async (req, res) => {
  const user = req.user.id;
  const leave = await Leave.find({ userId: user });
  
  res.send(leave);
});

// Add Leave
router.post(
  "/add-Leave",
  [
    body("reason", "Write a suitable Reason").isLength({ min: 3 }),
    body("start", "Enter a valid Date").exists(),
    body("end", "Enter a valid Date").exists(),
    body("description", "Enter a valid description").isLength({ min: 3 }),
  ],
  FetchUser,
  async (req, res) => {
    let success = false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { reason,start,end ,description } = req.body;
      const data = new Leave({
        reason,start,end ,description,
        userId: req.user.id,
      });
      //finding
      
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
  }
);

//edit Leave
router.put(
    "/edit-Leave/:id",
    [
        body("reason", "Write a suitable Reason").isLength({ min: 3 }),
        body("start", "Enter a valid Date").exists(),
        body("end", "Enter a valid Date").exists(),
        body("description", "Enter a valid description").isLength({ min: 3 }),
      ],
    FetchUser,
    async (req, res) => {
      let success = false;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { reason,start,end ,description } = req.body;
        const newDept = {};
  
        if (reason) {
          newDept.reason = reason;
        }
        if (start) {
          newDept.start = start;
        }
        if (end) {
          newDept.end = end;
        }
        if (description) {
          newDept.description = description;
        }
  
        const leave = await Leave.findById(req.params.id);
        if (!leave) {
          return res.status(404).json({ errors: "Leave not found" });
        }
  
        const updateDept = await Leave.findByIdAndUpdate(
          req.params.id,
          { $set: newDept },
          { new: true }
        );
  
        success = true;
        res.json({ success, updateDept });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({
          success: success,
          errors: `Unexpected Error Occurred: ${error.message}`,
        });
      }
    }
  );

  //delete Leave
  router.delete('/delete-Leave/:id',FetchUser,async(req,res)=>{
    let success=false
    try {
        const userId=req.params.id
        const deptData=await Leave.findById(userId)
        if(!deptData)
        {
            return res.status(404).json({ errors: "Leave not found" }); 
        }
        success=true
        const delLeave=await Leave.findByIdAndDelete(userId)
        res.json({Success:success,Details:"Data Deleted",Leave:delLeave})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
          success: success,
          errors: `Unexpected Error Occurred: ${error.message}`,
        });
    }
  })
module.exports = router;
