const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());

// database connection
require("./config/database").connect();

// import routes and mount
const user = require("./routes/User");
app.use("/api/v1", user);

// activate server
app.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
});