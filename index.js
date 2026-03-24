const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // ✅ ADD THIS

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cookieParser()); // ✅ ADD THIS LINE

// database connection
require("./config/database").connect();

// import routes and mount
const user = require("./routes/User");
app.use("/api/v1", user);

// test route
app.get("/test", (req, res) => {
  res.send("server working");
});

// activate server
app.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
});