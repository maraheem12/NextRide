
const express = require('express'); //importing express
const {body} = require("express-validator"); //importing express-validator
const router = express.Router(); //creating router
const userController = require('../controllers/user.controller'); //importing user controller
const userModel = require('../models/user.model'); //importing user model
const bcrypt = require('bcrypt'); //importing bcrypt
const jwt = require('jsonwebtoken'); //importing jsonwebtoken
//register routemodule.exports.authUser = async (req, res, next) => {
    try {
        // Retrieve token from cookies or authorization header
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided' });
        }

        // Check if the token is blacklisted
        const isTokenBlacklisted = await userModel.findOne({ token });
        if (isTokenBlacklisted) {
            return res.status(401).json({ message: 'Access denied. Token blacklisted' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        // Handle JWT errors and others
        return res.status(401).json({ message: error.message || 'Invalid token' });
    }
};
