import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
const app=express();


//for api testing
app.use(morgan('dev'));

//for store cookie/parse cookies
app.use(cookieParser());

//for read user data
app.use(express.json());

// for form data parsing
app.use(express.urlencoded({extended:true}));







//set auth routes 

app.use("/api/auth",authRouter);






export default app;
