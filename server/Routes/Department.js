const express = require("express");
const Dept = require("../models/Dept");
const { body, validationResult } = require("express-validator");
const FetchUser = require("../middleware/FetchUser");

const router = express.Router();

//get Department
router.get("/get-Departments", FetchUser, async (req, res) => {
  const user = req.user.id;
  const dept = await Dept.find({ userId: user });
  res.send(dept);
});

// Add department
router.post(
  "/add-department",
  [
    body("deptName", "Enter a valid Department").isLength({ min: 1 }),
    body("employeeId", "Enter a valid Id").isLength({ min: 3 }),
  ],
  FetchUser,
  async (req, res) => {
    let success = false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { deptName, employeeId } = req.body;
      const data = new Dept({
        deptName,
        employeeId,
        userId: req.user.id,
      });
      //finding
      const findDept = await Dept.findOne({ deptName: deptName });
      if (findDept) {
        return res
          .status(404)
          .json({ Success: success, Error: "Department Already Added..!" });
      }
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

//edit Department
router.put(
    "/edit-department/:id",
    [
      body("deptName", "Enter a valid Department").isLength({ min: 1 }),
      body("employeeId", "Enter a valid Id").isLength({ min: 3 }),
    ],
    FetchUser,
    async (req, res) => {
      let success = false;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { deptName, employeeId } = req.body;
        const newDept = {};
  
        if (deptName) {
          newDept.deptName = deptName;
        }
        if (employeeId) {
          newDept.employeeId = employeeId;
        }
  
        const department = await Dept.findById(req.params.id);
        if (!department) {
          return res.status(404).json({ errors: "Department not found" });
        }
  
        const updateDept = await Dept.findByIdAndUpdate(
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

  //delete department
  router.delete('/delete-department/:id',FetchUser,async(req,res)=>{
    let success=false
    try {
        const userId=req.params.id
        const deptData=await Dept.findById(userId)
        if(!deptData)
        {
            return res.status(404).json({ errors: "Department not found" }); 
        }
        success=true
        const delDept=await Dept.findByIdAndDelete(userId)
        res.json({Success:success,Details:"Data Deleted",Department:delDept})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
          success: success,
          errors: `Unexpected Error Occurred: ${error.message}`,
        });
    }
  })
module.exports = router;
