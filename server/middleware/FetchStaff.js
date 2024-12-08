const Staff = require('../models/StaffSchema');
const jwt = require('jsonwebtoken');

const fetchStaff = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Please authenticate using a valid token'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const staff = await Staff.findById(decoded.staffId);
        
        if (!staff) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication token'
            });
        }

        req.staff = staff;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Please authenticate using a valid token'
        });
    }
};

module.exports = fetchStaff;