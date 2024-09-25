const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const User = require("../models/user.js");

// @route   POST /api/users/register
// @desc    Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, user: savedUser });

  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/users/login
// @desc    Login user and return JWT token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Password incorrect" });
    }

    // Create JWT payload
    const payload = { id: user.id, name: user.name };

    // Sign token
    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });

    res.status(200).json({
      success: true,
      token: "Bearer " + token,
    });

  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete user by ID (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete user
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });

  } catch (err) {
    console.error("Error in /delete:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/users
// @desc    Get all users (Admin only)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// @route   GET /api/users/:id/history
// @desc    Get user history by user ID
router.get('/:id/history', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('history'); // Adjust according to your schema
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user.history); // Adjust according to your schema
  } catch (err) {
    console.error('Error fetching user history:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
