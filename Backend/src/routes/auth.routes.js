import { Router } from "express";

import { login, register } from "../controllers/auth.controller.js";

import { userValidator,loginValidator } from "../validator/auth.validator.js";


const authRouter=Router();


authRouter.post('/register',userValidator,register);

authRouter.post('/login',loginValidator,login)



export default authRouter;