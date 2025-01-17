const express = require('express');
const {body} = require("express-validator");
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', [  
    body('fullname.firstname').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
userController.registerUser)
//here after register 1 arrays is present and one user is registered


module.exports = router;