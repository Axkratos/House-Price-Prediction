const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("./keys");

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleID: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleID: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );

  // Facebook OAuth Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "email"],
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookID: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              facebookID: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );

  // GitHub OAuth Strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: keys.githubClientID,
        clientSecret: keys.githubClientSecret,
        callbackURL: "/auth/github/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ githubID: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              githubID: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );
};
