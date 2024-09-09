// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const User = require("../Models/UsersModel");

// Set up Google strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       profile.accessToken = accessToken; // Store the access token in the profile
//       profile.refreshToken = refreshToken; // Optional: If you need to refresh the token later
//       done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Google OAuth Login
// router.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: [
//       "email",
//       "profile",
//       "https://www.googleapis.com/auth/youtube.upload",
//     ],
//   })
// );

exports.googleCallback =
  async (req, res) => {
    // Successful authentication
    const profile = req.user;
    console.log(profile);
    const name = profile.displayName;
    const email = profile.emails[0].value;
    const youtubeChannelId = profile.id;

    // Check if user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user with generated jwtSecretKey
      const newuser = new User({
        name,
        email,
        youtubeChannelId,
        // jwtSecretKey: crypto.randomBytes(32).toString("hex"),
        role: "organizer", // Assuming only organizers log in via Google
      });
      await newuser.save();
    }

    res.redirect("http://localhost:5173"); // Redirect to the frontend
  }

//Auth user
exports.AuthenticateGoogle= async  (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user); // Send back the user info stored in the session
    console.log("authenticated");
    // console.log(req.user);
  } else {
    res.status(401).send("Unauthorized");
    console.log("not authorized");
  }
};

//logout api
exports.handleLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out.");
    }
    // Optionally clear the cookie as well
    res.clearCookie("connect.sid", { path: "/" });
    // Redirect the user to the frontend after logging out
    //   res.redirect('http://localhost:5173');
    res.status(200).send("Logged out successfully");
  });
  console.log("logout");
};







