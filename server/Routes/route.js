const express = require("express");
const FetchUser = require("../middleware/FetchUser");
const {
  getDepartments,
  addDepartment,
  editDepartment,
  deleteDepartment,
} = require("../controllers/Department.controller");
const { body } = require("express-validator");

const router = express.Router();

// Define routes with the exported functions
router.get("/get-departments", FetchUser, getDepartments);
router.post(
  "/add-department",
  [
    body("deptName", "Enter a valid Department").isLength({ min: 1 }),
    body("employeeId", "Enter a valid Id").isLength({ min: 3 }),
  ],
  FetchUser,
  addDepartment
);
router.put(
  "/edit-department/:id",
  [
    body("deptName", "Enter a valid Department").isLength({ min: 1 }),
    body("employeeId", "Enter a valid Id").isLength({ min: 3 }),
  ],
  FetchUser,
  editDepartment
);
router.delete("/delete-department/:id", FetchUser, deleteDepartment);

module.exports = router;
