require("dotenv").config();
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const ULeave = require("./models/ULeave");

const JWT_SECRET = "kufychmchmkdyikyh";
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
        let user = await ULeave.findOne({
          $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
        });

        if (!user) {
          // Create a new user if none found
          user = new ULeave({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
        } else {
          // If user exists but doesn't have a Google ID, add it
          if (!user.googleId) {
            user.googleId = profile.id;
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
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find user by Facebook ID or email
        let user = await ULeave.findOne({
          $or: [{ facebookId: profile.id }, { email: profile.emails ? profile.emails[0].value : "" }],
        });

        if (!user) {
          // Create a new user if none found
          user = new ULeave({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : "",
          });
        } else {
          // If user exists but doesn't have a Facebook ID, add it
          if (!user.facebookId) {
            user.facebookId = profile.id;
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

// Serialize ULeave
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize ULeave
passport.deserializeUser(function (id, done) {
  ULeave.findById(id, function (err, user) {
    done(err, user);
  });
});
