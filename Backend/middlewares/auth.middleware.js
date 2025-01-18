
const express = require('express'); //importing express
const {body} = require("express-validator"); //importing express-validator
const router = express.Router(); //creating router
const userController = require('../controllers/user.controller'); //importing user controller
const userModel = require('../models/user.model'); //importing user model
const bcrypt = require('bcrypt'); //importing bcrypt
const jwt = require('jsonwebtoken'); //importing jsonwebtoken
//register route
module.exports.authUser = async (req, res, next) => {
    const token = req.cokkies?.token|| req.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }
    const isTokenBlacklisted = await userModel.findOne({ token });
    if(!isTokenBlacklisted) {
        return res.status(401).json({ message: 'Access denied. Token blacklisted' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } 
        req.user = user;    
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }  
}
