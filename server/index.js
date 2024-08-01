require("dotenv").config();
const express = require("express");
const path = require("path");
const connectTomongo = require("./Db");
const cors = require('cors');

const app = express();

connectTomongo();
const port = process.env.PORT || "8000";

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL, // Replace with your front-end URL or use '*' to allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));

// Image or video max size is required for JSON file
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(require(path.join(__dirname, "Routes/Department.js")));
app.use(require(path.join(__dirname, "Routes/Leave.js")));
app.use(require(path.join(__dirname, "Routes/Salary.js")));
app.use(require(path.join(__dirname, "Routes/Staff.js")));
app.use(require(path.join(__dirname, "Routes/Auth/auth.js")));

app.get('/test', (req, res) => {
  try {
    res.json({ Success: true, msg: 'API is Working Properly..' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Success: false, msg: 'API is not Working Properly..' });
  }
});

app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
