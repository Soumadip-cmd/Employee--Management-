require("dotenv").config();
const express = require("express");
const path = require("path");
const connectToMongo = require("./Db");
const cors = require("cors");

const app = express();

connectToMongo(); // Connect to MongoDB
const port = process.env.PORT || 8000; // Default port 8000

// CORS configuration
const corsOptions = {
  origin:"http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Allow credentials (cookies, headers)
};

app.use(cors(corsOptions));

// Parse incoming requests with JSON payloads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use(require(path.join(__dirname, "Routes/Department.js")));
app.use(require(path.join(__dirname, "Routes/Leave.js")));
app.use(require(path.join(__dirname, "Routes/Salary.js")));
app.use(require(path.join(__dirname, "Routes/Staff.js")));
app.use(require(path.join(__dirname, "Routes/Auth/auth.js")));

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
