require("dotenv").config();
const Org = require("../Models/OrganizerModel");
const User = require("../Models/UsersModel");
const getTokenfromCookie = require("../helpers/cookie.helper");
const { verifyToken } = require("../helpers/jwt.helper");
const { google } = require('googleapis');
// const youtubeClient= require('../config/youtube');
// const oauth2Client = require('../config/oauth2client');
exports.googleCallback = async (req, res) => {
  // Successful authentication
  const profile = req.user;
  console.log(profile);
  const name = profile.displayName;
  const email = profile.emails[0].value;
  const youtubeChannelId = profile.id;
  const profileImageUrl=profile?.photos[0]?.value;

  // Check if user already exists in the database
  let user = await User.findOne({ email });
  console.log("user found");
  if(user!=null)
  {
    console.log("inside user");
    // Create a new user with generated jwtSecretKey
    const newuser = new Org({
      name,
      email,
      youtubeChannelId,
      profileImageUrl,
      youtubeChannelName:"",
      // jwtSecretKey: crypto.randomBytes(32).toString("hex"),
      role: "organizer", // Assuming only organizers log in via Google
    });
    await newuser.save();
  }

  res.redirect("http://localhost:5173/orgDashboard"); // Redirect to the frontend
};

//Auth user
exports.AuthenticateGoogle = async (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    console.log("authenticated");
    return res.json(req.user); // Send back the user info stored in the session
  } else {
    res.status(401).send("Unauthorized");
    console.log("not authorized");
  }
};

//Auth user (only editor)
exports.AuthenticateUser = async (req, res) => {
    if (!req.headers.cookie) {
      return res.status(401).json({ error: "token not provided" });
    }
    console.log(req.headers.cookie);
    const token = getTokenfromCookie(req.headers.cookie); // Fetch token from cookies
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized access, no token provided" });
    }

    try {
      // Verify the token
      const decodedtoken = await verifyToken(token);
      console.log(decodedtoken);
      if (!decodedtoken) {
        console.log(" token verification failed");
        return res.status(401).json({ error: "Token verification failed" });
      }

      const user = await User.findOne(decodedtoken.userId);
      delete user.password;
      console.log("user id is ", user);
      req.user = decodedtoken; // Attach the decoded token payload to the request object
      console.log(" token verification successful");
      // next(); // Proceed to the next middleware or route handler

      return res.status(200).json({user});
    } 
    catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
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

exports.handleTextChange = async (req, res) => {
  res.status(200).send("Authorised user");
};
