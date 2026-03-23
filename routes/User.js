const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middleware/midauth");

router.post("/signup", signup);
router.post("/login", login);

// Protected Routes

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to protected TEST route",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the student route",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the routes for the admin",
  });
});

module.exports = router;