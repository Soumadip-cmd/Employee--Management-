const express = require("express");
const User = require("../../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const FetchUser = require("../../middleware/FetchUser");

const router = express.Router();
const jwt_Secret = process.env.JWT_SECRET;

// Create user
router.post(
  "/create-user",
  [
    body("Fname", "Enter Valid Name").isLength({ min: 3 }),
    body("Lname", "Enter Valid Name").isLength({ min: 2 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Length must be atleast 5 chars").isLength({
      min: 5,
    }),
    body("adminId", "adminId Length must be atleast 3 chars").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    let success = false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ Success: success, errors: errors.array() });
      }

      const email = req.body.email;
      const emailExist = await User.findOne({ email });

      if (emailExist && emailExist.email === email) {
        return res
          .status(404)
          .json({ Success: success, msg: "Your Email Already Exists !!" });
      }

      const hashpass = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, hashpass);

      const user = await User.create({
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        email: req.body.email,
        password: secpass,
        adminId: req.body.adminId,
      });

      success = true;
      data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, jwt_Secret);
      res.json({ Success: success, token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        Success: success,
        msg: `Internal Server Error: ${error.message}`,
      });
    }
  }
);

//login user
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Length must be atleast 5 chars").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ Success: success, errors: errors.array() });
      }

      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        res
          .status(404)
          .json({ Success: success, errors: "Invalid Authentication..!" });
      }
      
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        res
          .status(404)
          .json({ Success: success, errors: "Invalid Authentication..!" });
      }

      success = true;
      data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, jwt_Secret);
      res.json({ Success: success, token: token });

      //
    } catch (error) {
      console.error(error);
      res.status(500).json({
        Success: success,
        msg: `Internal Server Error: ${error.message}`,
      });
    }
  }
);


//get user
router.get('/get-user',FetchUser,async(req,res)=>{
      let success=false
      try {
            const userId=req.user.id
            const data=await User.findById(userId).select("-password")
            success= true
            res.json({Success:success,Details:data})

      } catch (error) {
            console.error(error);
            res.status(500).json({
              Success: success,
              msg: `Internal Server Error: ${error.message}`,
            });
      }
})

module.exports = router;
