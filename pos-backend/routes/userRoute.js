const express = require("express");
//  const { register, login, getUserData, logout } = require("../controllers/userController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();

const {
  register,
  login,
  getUserData,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword
} = require("../controllers/userController"); //  Durgesh 13 March 


// Authentication Routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(isVerifiedUser, logout)

router.route("/").get(isVerifiedUser , getUserData);


router.route("/forgot-password").post(forgotPassword); // Durgesh 

router.route("/verify-otp").post(verifyOTP);

router.route("/reset-password").post(resetPassword);


module.exports = router;