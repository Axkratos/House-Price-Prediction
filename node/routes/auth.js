const express = require("express");
const router = express.Router();
const passport = require("passport");

// @route   GET /auth/google
// @desc    Authenticate with Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route   GET /auth/google/callback
// @desc    Google auth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @route   GET /auth/facebook
// @desc    Authenticate with Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// @route   GET /auth/facebook/callback
// @desc    Facebook auth callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/signin" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @route   GET /auth/github
// @desc    Authenticate with GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// @route   GET /auth/github/callback
// @desc    GitHub auth callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/signin" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @route   GET /auth/logout
// @desc    Logout user
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
