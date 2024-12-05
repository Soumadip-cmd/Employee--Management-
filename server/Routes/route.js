const express = require("express");
const FetchUser = require("../middleware/FetchUser");
const {
  getDepartments,
  addDepartment,
  editDepartment,
  deleteDepartment,
} = require("../controllers/Department.controller");
const {
  getLeaves,
  addLeave,
  editLeave,
  deleteLeave,
} = require("../controllers/Leave.controller");
const {
  getSalary,
  addSalary,
  editSalary,
  deleteSalary,
} = require("../controllers/Salary.controller");
const { body } = require("express-validator");
const {
  getAllStaff,
  addStaff,
  editStaff,
  deleteStaff,
} = require("../controllers/Staff.controller");

const router = express.Router();

// Department Routes
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

// Leave Routes
// Routes
router.get("/get-leaves", FetchUser, getLeaves);

router.post(
  "/add-leave",
  [
    body("reason", "Write a suitable Reason").isLength({ min: 3 }),
    body("start", "Enter a valid Date").exists(),
    body("end", "Enter a valid Date").exists(),
    body("description", "Enter a valid description").isLength({ min: 3 }),
  ],
  FetchUser,
  addLeave
);

router.put(
  "/edit-leave/:id",
  [
    body("reason", "Write a suitable Reason").isLength({ min: 3 }),
    body("start", "Enter a valid Date").exists(),
    body("end", "Enter a valid Date").exists(),
    body("description", "Enter a valid description").isLength({ min: 3 }),
  ],
  FetchUser,
  editLeave
);

router.delete("/delete-leave/:id", FetchUser, deleteLeave);

// Salary Routes
router.get("/get-all-salary", FetchUser, getSalary);

router.post(
  "/add-salary",
  [
    body("StaffName", "Write Staff Name").isLength({ min: 3 }),
    body("department", "Enter a Department").exists(),
    body("Paid_Salary", "Enter a valid Salary").exists(),
  ],
  FetchUser,
  addSalary
);

router.put(
  "/edit-salary/:id",
  [
    body("StaffName", "Write Staff Name").isLength({ min: 3 }),
    body("department", "Enter a Department").exists(),
    body("Paid_Salary", "Enter a valid Salary").exists(),
  ],
  FetchUser,
  editSalary
);

router.delete("/delete-salary/:id", FetchUser, deleteSalary);

// Staff Route

// Validation rules for staff
const staffValidationRules = [
  body("name", "Enter your proper full name").isLength({ min: 3 }),
  body("gender", "Enter gender").exists(),
  body("phone", "Enter phone number").isNumeric(),
  body("dob", "Enter Your birth date").isLength({ min: 3 }),
  body("city", "Enter a valid city").isLength({ min: 3 }),
  body("country", "Enter Your country").exists(),
  body("department", "Enter your department").isLength({ min: 1 }),
  body("email", "Enter a valid email").isEmail(),
  body("date_of_join", "Enter a date of your joining").isLength({ min: 3 }),
  body("state", "Enter a valid state e.g WestBengal").exists(),
  body("address", "Enter your address").isLength({ min: 5 }),
];

router.get("/get-staffs", FetchUser, getAllStaff);
router.post("/add-Staff", staffValidationRules, FetchUser, addStaff);
router.put("/edit-Staff/:id", staffValidationRules, FetchUser, editStaff);
router.delete("/delete-Staff/:id", FetchUser, deleteStaff);

module.exports = router;
