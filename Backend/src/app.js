import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
import passport from 'passport'
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { config } from 'dotenv';
import cors from "cors";
import productRouter from './routes/product.routes.js';


const app=express();

// google auth setup

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  
  return done(null, profile);
}));


app.use(cors({
    origin: "http://localhost:5173",
    methods: [ "GET", "POST", "PUT", "DELETE" ],
    credentials: true
}))





//for api testing
app.use(morgan('dev'));

//for store cookie/parse cookies
app.use(cookieParser());


// for form data parsing
app.use(express.urlencoded({extended:true}));




//for read user data
app.use(express.json());


//set auth routes 

app.use("/api/auth",authRouter);


app.use("/api/products",productRouter);




export default app;
