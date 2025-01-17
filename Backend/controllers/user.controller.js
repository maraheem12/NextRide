
const userModel = require('../models/user.model');
const userService = require('../services/user.service');    
const {validationResult} = require("express-validator");


module.exports.registerUser = async (req, res, next) => {
    const {fullname, email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already exists' });
        }
   
    
    const userss = new userModel();
    const hashPassword = await userss.hashPassword(password);
   // const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
})
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
}
