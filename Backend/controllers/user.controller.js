const userModel = require('../models/user.model');
const userService = require('../services/user.service');    
const {validationResult} = require("express-validator");
const backListTokenModel = require('../models/blackListTokenModel');
const BlackListToken = require('../models/blackListTokenModel');

module.exports.registerUser = async (req, res, next) => {
    const {fullname, email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const existingUser = await userModel.findOne({ email });
        if (existingUser){
            return res.status(400).send({ message: 'Email already exists' });
        }
    const userss = new userModel();
    const hashPassword = await userss.hashPassword(password);
    
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
})
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
}


module.exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).send({ message: 'Invalid email or password'  });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = await user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ user, token });
}


//This code is from user.controller.js
module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}   

//This code is from user.controller.js
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = await req.cokkies.token|| req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });

}

