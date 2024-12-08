const Staff = require('../models/StaffSchema');
const jwt = require('jsonwebtoken');

const verifyStaffEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        
        // Check if staff exists with this email
        const staff = await Staff.findOne({ email });
        if (!staff) {
            return res.status(401).json({
                success: false,
                message: 'Email not found in staff records'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { staffId: staff._id, email: staff.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        req.staff = staff;
        req.token = token;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error during verification'
        });
    }
};

module.exports = verifyStaffEmail;