// this is for apply Salary (not for admin)
const express = require("express");

const { body, validationResult } = require("express-validator");
const FetchUser = require("../middleware/FetchUser");
const Salary = require("../models/SalSchema");

const router = express.Router();

//get Salary
router.get("/get-all-Salary", FetchUser, async (req, res) => {
    const user = req.user.id;
    const salary = await Salary.find({ userId: user });

    res.send(salary);
});

// Add Salary
router.post(
    "/add-Salary",
    [
        body("StaffName", "Write Staff Name").isLength({ min: 3 }),
        body("department", "Enter a Department").exists(),
        body("Paid_Salary", "Enter a valid Salary").exists(),
    ],
    FetchUser,
    async (req, res) => {
        let success = false;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { StaffName, department, Paid_Salary } = req.body;
            const data = new Salary({
                StaffName, department, Paid_Salary,
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

//edit Salary
router.put(
    "/edit-Salary/:id",
    [
        body("StaffName", "Write Staff Name").isLength({ min: 3 }),
        body("department", "Enter a Department").exists(),
        body("Paid_Salary", "Enter a valid Salary").exists(),
    ],
    FetchUser,
    async (req, res) => {
        let success = false;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { StaffName, department, Paid_Salary } = req.body;
            const newSal = {};

            if (StaffName) {
                newSal.StaffName = StaffName;
            }
            if (department) {
                newSal.department = department;
            }
            if (Paid_Salary) {
                newSal.Paid_Salary = Paid_Salary;
            }


            const salary = await Salary.findById(req.params.id);
            if (!salary) {
                return res.status(404).json({ errors: "Salary not found" });
            }

            const updateDept = await Salary.findByIdAndUpdate(
                req.params.id,
                { $set: newSal },
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

//delete Salary
router.delete('/delete-Salary/:id', FetchUser, async (req, res) => {
    let success = false
    try {
        const userId = req.params.id
        const SalData = await Salary.findById(userId)
        if (!SalData) {
            return res.status(404).json({ errors: "Salary not found" });
        }
        success = true
        const delSalary = await Salary.findByIdAndDelete(userId)
        res.json({ Success: success, Details: "Data Deleted", Salary: delSalary })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: success,
            errors: `Unexpected Error Occurred: ${error.message}`,
        });
    }
})
module.exports = router;
