const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const BlacklistedToken = require("../models/blackListedToken.model");
module.exports.registerUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { fullname, email, password } = req.body;
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      res.status(401).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword
    });
    const token = await user.generateAuthToken();
    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "wrong password" });
    }
    const token = await user.generateAuthToken();
    res.cookie("token", token); // Set the cookie with the token
    res.status(200).json({ token, user });

}

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json( req.user );
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie("token"); // Clear the cookie
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1] ; // Get the token from cookies
    await BlacklistedToken.create({ token }); // Store the token in the database
    res.status(200).json({ message: "Logged out successfully" });

}