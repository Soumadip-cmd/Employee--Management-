require("dotenv").config();
const express = require("express");
const path = require("path");
const connectTomongo = require("./Db");
const cors = require('cors');

const app = express();

connectTomongo();
const port = process.env.PORT || "8000";

app.use(cors())
//image or video max size i srequired for json file
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(require(path.join(__dirname, "Routes/Admin.js")));
app.use(require(path.join(__dirname, "Routes/Department.js")));
app.use(require(path.join(__dirname, "Routes/Leave.js")));
app.use(require(path.join(__dirname, "Routes/Salary.js")));
app.use(require(path.join(__dirname, "Routes/Staff.js")));
app.use(require(path.join(__dirname, "Routes/Auth/auth.js")));

app.post('/test',(req,res)=>{
  try {
    res.json({Success:true,msg:'Api is Working Properly..'})
  } catch (error) {
    console.error(error.message)
    res.status(500).json({Success:false,msg:'Api is not Working Properly..'})
  }
})
  
  

app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
