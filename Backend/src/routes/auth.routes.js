import { Router } from "express";

import { register } from "../controllers/auth.controller.js";

import { userValidator } from "../validator/auth.validator.js";


const authRouter=Router();


authRouter.post('/register',userValidator,register);





export default authRouter;