import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
const app=express();
import cors from 'cors';

//for api testing
app.use(morgan('dev'));

//for store cookie/parse cookies
app.use(cookieParser());


// for form data parsing
app.use(express.urlencoded({extended:true}));

//cros 
app.use(cors({
    origin:'http://localhost:5173',
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))



//for read user data
app.use(express.json());


//set auth routes 

app.use("/api/auth",authRouter);






export default app;
