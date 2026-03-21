


const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt= require("jsonwebtoken");
require("dotenv").config(); 

// signup route handler
exports.signup = async (req, res) => {
  try {
    // get data
    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered",
    });
  }
};


// Login Controller

exports.login = async (req, res) => {
  try {
    // data fetch
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Kindly fill complete details",
      });
    }

    const validateUser = await User.findOne({ email });

    if (!validateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found; signup first",
      });
    }

    const payload={
      email:User.email,
      id:User._id,
      role:User._role,
      }

    // validate password
    if (await bcrypt.compare(password, validateUser.password)) {
      // ✅ you must respond here (later JWT)
      let jwt=jwt.sign(payload,
        process.env.JWT_SECRET,
        {
          expiresIn:"2h",

        }
      );
     validateUser.token=token;
    validateUser.password=undefined;
     return res.cookie()

    } 

    else {
      return res.status(403).json({
        success: false,
        message: "Incorrect Password",
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not Login for some reason",
    });
  }
};