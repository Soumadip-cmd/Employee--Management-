require("dotenv").config();
const express = require("express");
const path = require("path");
const connectToMongo = require("./config/Db");
const cors = require("cors");
const passport=require('passport')
const passportAUTH=require('./Passport')
const passportAuth=require('./controllers/Auth/Passport.auth');
const router = require("./Routes/route");


const app = express();

connectToMongo(); // Connect to MongoDB
const port = process.env.PORT || 8000; // Default port 8000


//ejs innitialize
app.set('views', path.join(__dirname, 'views')); // Adjust the path if necessary
app.set('view engine', 'ejs');
//


// Parse incoming requests with JSON payloads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use('/auth',passportAuth)

app.use(passport.initialize());


// CORS configuration
const corsOptions = {
  origin: [process.env.CLIENT_URL , "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Allow credentials (cookies, headers)
};

app.use(cors(corsOptions));



// Routes
app.use(router)



// Test Route
app.get("/test", (req, res) => {
  try {
    res.json({ Success: true, msg: "API is Working Properly.." });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ Success: false, msg: "API is not Working Properly.." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
