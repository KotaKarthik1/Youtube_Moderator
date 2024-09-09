const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Organizer controllers
const authController = require("../Controller/auth.controller");

//Editor controllers
const authControllerEditor = require("../Controller/autheditor.controller.js");

// Importing middlewares
const verifyOrganizer = require("../middleware/verifyOrganizer.js");
const verifyEditor =  require("../middleware/verifyEditor.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken; // Store the access token in the profile
      profile.refreshToken = refreshToken; // Optional: If you need to refresh the token later
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get("/auth/logout", verifyOrganizer, authController.handleLogout);
router.get("/auth/user", authController.AuthenticateGoogle);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173", // Frontend login page URL
  }),
  authController.googleCallback
);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "email",
      "profile",
      "https://www.googleapis.com/auth/youtube.upload",
    ],
  })
);


//editor routes auth
router.post('/EditorLogin',authControllerEditor.HandleEditorLogin);
router.post('/EditorRegister',authControllerEditor.HandleEditorRegister);
router.get('/EditorLogout',verifyEditor,authControllerEditor.HandleEditorLogout);
module.exports = router;