const express = require("express");
const {
  signUp,
  retrieveUsers,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
} = require("../controllers/registration");
const { body } = require("express-validator");
const userModel = require("../models/registration");

const userRouter = express.Router();

const checkUniqueness = async (value, { req, path }) => {
  try {
    const isMatch = await userModel.findOne({ [path]: value });
    if (isMatch) {
      return Promise.reject(`${path} already exists`);
      // throw new Error(`${path} already exists`);
    }
  } catch (err) {
    return Promise.reject("Error checking uniqueness");
  }
};

userRouter.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .custom(checkUniqueness),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .not()
      .isEmpty()
      .withMessage("Password is required"),
  ],
  signUp
);

userRouter.get("/getusers", retrieveUsers);
userRouter.post("/signin", signIn);
userRouter.post("/signout", signOut);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "your_email@gmail.com",
      subject: "Testing email",
      text: "This is a test email from Nodemailer",
    });
    res.status(200).send("Test email sent!");
  } catch (error) {
    console.error("Test email error:", error.message);
    res.status(500).send("Test email failed");
  }
});

module.exports = userRouter;
