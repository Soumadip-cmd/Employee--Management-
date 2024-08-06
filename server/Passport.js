require("dotenv").config();
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("./models/authLogin");

const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find user by Google ID or email
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
        });

        if (!user) {
          // Create a new user if none found
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: {
              url: profile.photos[0].value, // Extract avatar URL
            },
          });
        } else {
          // If user exists but doesn't have a Google ID, add it
          if (!user.googleId) {
            user.googleId = profile.id;
          }

          // Update the avatar URL if changed
          if (profile.photos && profile.photos.length > 0) {
            user.avatar.url = profile.photos[0].value;
          }
        }

        await user.save();

        const token = jwt.sign(
          {
            id: user.id,
          },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        return done(null, { user, token });
      } catch (error) {
        console.error(error);
        return done(error, null);
      }
    }
  )
);


// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email", "photos"], // Add photos to profileFields
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find user by Facebook ID or email
        let user = await User.findOne({
          $or: [{ facebookId: profile.id }, { email: profile.emails ? profile.emails[0].value : "" }],
        });

        if (!user) {
          // Create a new user if none found
          user = new User({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : "",
            avatar: {
              url: profile.photos[0].value, // Extract avatar URL
            },
          });
        } else {
          // If user exists but doesn't have a Facebook ID, add it
          if (!user.facebookId) {
            user.facebookId = profile.id;
          }

          // Update the avatar URL if changed
          if (profile.photos && profile.photos.length > 0) {
            user.avatar.url = profile.photos[0].value;
          }
        }

        await user.save();

        const token = jwt.sign(
          {
            id: user.id,
          },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        return done(null, { user, token });
      } catch (error) {
        console.error(error);
        return done(error, null);
      }
    }
  )
);


// Serialize User
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize User
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
