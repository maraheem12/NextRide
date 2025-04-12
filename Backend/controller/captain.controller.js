const captainService = require("../services/captain.service");
const captainModel = require("../models/captain.model");
const blacklistModel = require("../models/blackListedToken.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const iscaptainAlreadyExist = await captainModel.findOne({ email });
  if (iscaptainAlreadyExist) {
    return res.status(409).json({ message: "Captain already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const captain = await captainModel.create({
    fullname,
    email,
    password: hashedPassword,
    vehicle,
  });
  const token = await captain.generateAuthToken();
  res.status(201).json({ token, captain }); // Fix: Send as object
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, captain.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = await captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain }); // Fix: Send as object
};

module.exports.getCaptainProfile = async (req, res) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
