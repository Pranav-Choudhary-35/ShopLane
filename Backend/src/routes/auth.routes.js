import { Router } from "express";

import {
  login,
  register,
  googleCallback,
} from "../controllers/auth.controller.js";

import { userValidator, loginValidator } from "../validator/auth.validator.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", userValidator, register);

authRouter.post("/login", loginValidator, login);


authRouter.get("/google",passport.authenticate('google',{scope:["profile","email"]}))


authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback,
);

export default authRouter;
