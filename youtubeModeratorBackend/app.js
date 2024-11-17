const express = require("express");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const authRoutes= require('./routes/auth.route');
const editorRoutes= require('./routes/EditorRoutes');
require("./authentication/auth"); // Import the Google strategy

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',  // Frontend URL, specific origin needed
    // methods:['GET','POST','OPTIONS'],
    credentials: true,                // Allow credentials (cookies)

  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// CORS configuration


app.use(
    session({
      secret: 'karthikkota',
      resave: false,
      saveUninitialized: false,  // Set this to false so sessions are only saved if they have data
      cookie: {
        secure: false, // Use true if using HTTPS
        httpOnly: true, // Helps prevent XSS attacks
        sameSite: 'lax', // Prevents cross-site request forgery
        maxAge: 24 * 60 * 60 * 1000 // 1 day, adjust as needed
      }
    })
  );
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.use(authRoutes);

//editor routed
app.use(editorRoutes);

module.exports=app;
