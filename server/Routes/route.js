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
  getStaffLeaves,
  getAllLeaves,
  updateLeaveStatus,
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
  staffLogin,
  getStaff,
  updateStaff,
} = require("../controllers/Staff.controller");
const {
  getAllAdmin,
  createUser,
  loginUser,
  getUser,
  editAdmin,
  deleteAdmin,
  updateDetails,
  getResetPassword,
  postResetPassword,
  forgetPassword,
  testEjs,
} = require("../controllers/Auth/Auth.controller");
const staffAuth = require("../middleware/StaffAuth");

const router = express.Router();

// Authentication Routes

// Validation rules
const createUserValidation = [
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password length must be at least 5 characters").isLength({
    min: 3,
  }),
  body("avatar", "Add a photo").optional().isLength({ min: 4 }),
];

const loginValidation = [
  body("email", "Enter Valid Email").isEmail(),
  body("password", "Password Length must be at least 5 chars").isLength({
    min: 3,
  }),
];

const updateValidation = [
  body("name", "Enter Valid UserName").isLength({ min: 3 }),
  body("password", "Password Length must be at least 5 chars").isLength({
    min: 3,
  }),
];

const editAdminValidation = [
  body("name", "Enter a valid username").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
];

// Routes
router.get("/get-all-admin", getAllAdmin);
router.post("/create-user", createUserValidation, createUser);
router.post("/login", loginValidation, loginUser);
router.get("/get-user", FetchUser, getUser);
router.put("/editAdmin/:id", editAdminValidation, editAdmin);
router.delete("/deleteAdmin/:id", deleteAdmin);
router.put("/updateDetails/:id", FetchUser, updateValidation, updateDetails);
router.get("/reset-password/:id/:token", getResetPassword);
router.post("/reset-password/:id/:token", postResetPassword);
router.post("/forget-password", forgetPassword);
router.get("/test-ejs", testEjs);

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



// Staff routes
router.post('/staff/login', [
  body('email', 'Enter valid email').isEmail()
], staffLogin);

router.get('/staff/leaves', staffAuth, getStaffLeaves);
router.get('/get-staff', staffAuth, getStaff);

router.post('/staff/addleave', [
  body('reason', 'Reason is required').notEmpty(),
  body('start', 'Start date is required').isDate(),
  body('end', 'End date is required').isDate(),
  body('description', 'Description is required').notEmpty()
], staffAuth, addLeave);

router.put('/staff/editleave/:id', [
  body('reason', 'Reason is required').notEmpty(),
  body('start', 'Start date is required').isDate(),
  body('end', 'End date is required').isDate(),
  body('description', 'Description is required').notEmpty()
], staffAuth, editLeave);

router.delete('/staff/delleave/:id', staffAuth, deleteLeave);
router.put("/staff/update/:id", staffAuth, updateStaff);

// Admin routes
router.get('/admin/leaves', FetchUser, getAllLeaves);

router.put('/admin/leave/:id/status', [
  body('status', 'Status is required').isIn(['approved', 'rejected'])
], FetchUser, updateLeaveStatus);



module.exports = router;
