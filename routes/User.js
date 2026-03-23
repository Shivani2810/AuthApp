const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/Auth");
const {login } = require("../controllers/Auth");


router.post("/signup", signup);
router.post("/login",login)


// Protected Routes



// testing the middleware route
router.get( "/test",midauth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the student TEST",
    })
})

router.get("/student",midauth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the student route",
    })
});

router.get("/admin",midauth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the routes for the admin",
    })
})

module.exports = router;