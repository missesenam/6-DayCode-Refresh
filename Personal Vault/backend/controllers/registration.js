const userModel = require("../models/registration");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// SignUp
const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "validation failed", error: errors.array() });
    }

    const { email, password } = req.body;
    const emailIsUniq = await userModel.findOne({ email });
    if (emailIsUniq) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        // secure: process.env.NODE_ENV === "production", // only in production
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "User created successfully",
        user: {
          email: newUser.email,
        },
        token,
      });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "failed to create user" });
  }
};

// Retrieve users — remove name from response if you want
const retrieveUsers = async (req, res) => {
  try {
    const findUsers = await userModel.find({}, { password: 0 }); // exclude password from results
    if (findUsers.length === 0) {
      res.status(404).json({ message: "No Users available" });
    }
    res.status(200).json({
      message: "All Users",
      numberOfUsers: findUsers.length,
      Users: findUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "failed to retrieve users" });
  }
};

// SignIn without name (same as before)
const signIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "validation failed", error: errors.array() });
    }

    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const compPassword = await bcrypt.compare(password, findUser.password);
    if (!compPassword) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign(
      {
        userId: findUser._id,
        email: findUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: {
          email: findUser.email,
        },
        token,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "failed to signin" });
  }
};

// SignOut
const signOut = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(201)
      .json({ message: "log out successful" });
  } catch (error) {
    console.error("LogOut error:", error);
    res.status(500).json({ message: "failed to log out" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    console.log("Request received for email:", email);

    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("No user found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const token = crypto.randomBytes(20).toString("hex");
    const expiration = Date.now() + 3600000; // 1 hour

    // Save to DB
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiration;
    await user.save();
    console.log("Token generated and saved:", token);

    // Email content
    const resetLink = `http://localhost:5173/reset-password/${token}`;
    const subject = "Password Reset Request";
    const text = `Click this link to reset your password:\n\n${resetLink}\n\nIf you didn’t request this, ignore this email.`;

    // Send email
    try {
      await sendEmail({ to: user.email, subject, text });
      console.log("Email sent to:", user.email);
    } catch (emailErr) {
      console.error("Error sending email:", emailErr.message);
      return res.status(500).json({ message: "Failed to send reset email" });
    }

    return res
      .status(200)
      .json({ message: "Password reset link sent to email" });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signUp,
  retrieveUsers,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
};
