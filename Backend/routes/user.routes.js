const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);
module.exports = router;
