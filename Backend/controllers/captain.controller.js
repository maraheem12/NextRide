const express = require('express');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const router = express.Router();
const captainModel = require('../models/captain.model');
const BlackListTokenModel = require('../models/blackListTokenModel');

// Get all captains
module.exports.registerCaptain = async (req, res, next) => {
    const { fullname, email, password, vehicle } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
        return res.status(400).send({ message: 'Email already exists' });
    }
    const captainss = new captainModel();
    const hashedPassword = await captainss.hashPassword(password);
    
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        plate : vehicle.plate,
        color : vehicle.color,
        vehicleType : vehicle.vehicleType,
        capacity : vehicle.capacity
    });
    const token = await captain.generateAuthToken();
    res.status(201).json({ captain, token });
    next();
}

module.exports.loginCaptain = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(404).json({ message: 'Captain not found' });
    }   
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = await captain.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
    next();
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlackListTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}