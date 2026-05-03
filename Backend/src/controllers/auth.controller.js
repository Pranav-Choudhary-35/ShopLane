import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// Helper function to generate JWT and send auth response
// Creates a token, sets it in cookie, and returns user data to client
async function sendTokenResponse(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "10d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message,
    token,
    user: {
      email: user.email,
      contact: user.contact,
      fullname: user.fullname,
      role: user.role,
    },
  });
}

// Handle new user registration with email, password, and role selection (buyer/seller)
// Validates for duplicate email, contact, and username before creating user
export async function register(req, res) {
  const { email, contact, password, fullname, isSeller } = req.body;

  try {
    const isUserExist = await userModel.findOne({
      $or: [{ email }, { contact }, { fullname }],
    });

    if (isUserExist) {
      const errors = [];
      if (isUserExist.email === email) {
        errors.push({
          param: 'email',
          msg: 'Email already registered'
        });
      }
      if (isUserExist.contact === contact) {
        errors.push({
          param: 'contact',
          msg: 'Contact number already registered'
        });
      }
      if (isUserExist.fullname === fullname) {
        errors.push({
          param: 'fullname',
          msg: 'Username already taken'
        });
      }
      return res.status(400).json({
        success: false,
        message: errors.length > 0 ? errors.map(e => e.msg).join(', ') : 'User already exists',
        errors: errors.length > 0 ? errors : [{ param: 'email', msg: 'User already exists' }]
      });
    }

    const user = await userModel.create({
      email,
      contact,
      password,
      fullname,
      role: isSeller ? "seller" : "buyer",
    });

    await sendTokenResponse(user, res, "user register sucessfully");
  } catch (err) {
    console.error('Register error:', err);
    
    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const fieldMap = {
        email: 'email',
        contact: 'contact',
        fullname: 'fullname',
        password: 'password'
      };
      const param = fieldMap[field] || field;
      
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
        errors: [{ param, msg: `${field} already registered` }]
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: "Server Error",
      errors: [{ param: 'general', msg: 'Server Error' }]
    });
  }
}

// Handle user login with email and password validation
// Compares password with stored hash and generates JWT token
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        errors: [{ param: 'email', msg: 'Invalid email or password' }]
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email or password",
        errors: [{ param: 'password', msg: 'Invalid email or password' }]
      });
    }

    await sendTokenResponse(user, res, "user logged in sucessfully");
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ 
      success: false,
      message: "Server Error",
      errors: [{ param: 'general', msg: 'Server Error' }]
    });
  }
}

// Handle Google OAuth callback after successful authentication
// Creates new user if they don't exist, then redirects to frontend
export async function googleCallback(req,res) {
   const {id,displayName,emails,photos}=req.user;
const email=emails[0].value;
const profilePic=photos[0].value;

let user=await userModel.findOne({
  email
})

if(!user){
user =await userModel.create({
  email,
  googleId:id,
  fullname:displayName,
}) 

const token =jwt.sign({
  id:user._id,
},
config.JWT_SECRET,
{
  expiresIn:"7d"
}
)
res.cookie("token",token);
}

  res.redirect("http://localhost:5173");
 }

// Fetch current authenticated user profile from JWT token
// Used to retrieve user details after login or page refresh
export async function getMe(req,res){
  const user=req.user;

  res.status(200).json({
    success:true,
    user:{
      email:user.email,
      contact:user.contact,
      fullname:user.fullname,
      role:user.role,
    }
  })
 }