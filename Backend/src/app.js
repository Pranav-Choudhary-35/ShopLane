import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
import passport from 'passport'
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { config } from 'dotenv';
import cors from "cors";
import productRouter from './routes/product.routes.js';

import cartRouter from './routes/cart.routes.js';

config();
const app=express();

// Google OAuth 2.0 Strategy Configuration
// Handles the OAuth flow with Google and returns the user profile
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  
  return done(null, profile);
}));

// CORS Configuration
// Allows requests from frontend running on localhost:5173
app.use(cors({
    origin: "http://localhost:5173",
    methods: [ "GET", "POST", "PUT", "DELETE" ],
    credentials: true
}))

// Logging Middleware
// Logs all HTTP requests in development format
app.use(morgan('dev'));

// Cookie Parser Middleware
// Extracts and processes cookies from incoming requests
app.use(cookieParser());

// URL Encoded Body Parser
// Parses form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({extended:true}));

// JSON Body Parser
// Parses JSON request bodies
app.use(express.json());


//set auth routes 

app.use("/api/auth",authRouter);


app.use("/api/products",productRouter);

app.use("/api/cart",cartRouter);



export default app;
