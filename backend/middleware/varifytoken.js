const path = require('path');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const verifyAuthToken =async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ success: false, message: 'You are not login' });
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await users.findById(decoded._id)
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Invalid user' });
        }
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = verifyAuthToken;