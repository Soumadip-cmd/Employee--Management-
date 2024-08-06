require("dotenv").config();
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Auth = require("./models/authLogin");

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
        let user = await Auth.findOne({
          $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
        });

        if (!user) {
          // Create a new user if none found
          user = new Auth({
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
        let user = await Auth.findOne({
          $or: [{ facebookId: profile.id }, { email: profile.emails ? profile.emails[0].value : "" }],
        });

        if (!user) {
          // Create a new user if none found
          user = new Auth({
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

// Serialize Auth
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize Auth
passport.deserializeUser(function (id, done) {
  Auth.findById(id, function (err, user) {
    done(err, user);
  });
});
