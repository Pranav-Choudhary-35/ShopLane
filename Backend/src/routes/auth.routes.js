import { Router } from "express";

import {
  login,
  register,
  getMe,
  googleCallback,
} from "../controllers/auth.controller.js";

import { userValidator, loginValidator } from "../validator/auth.validator.js";
import passport from "passport";
import { authenticateUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

// POST /api/auth/register - Create new user account with email/password
// Validates input and assigns buyer or seller role based on registration type
authRouter.post("/register", userValidator, register);

// POST /api/auth/login - Authenticate user with email and password
// Returns JWT token and user details on successful login
authRouter.post("/login", loginValidator, login);

// GET /api/auth/google - Initiate Google OAuth authentication
// Redirects to Google login page
authRouter.get("/google", passport.authenticate('google', {scope:["profile","email"]}))

// GET /api/auth/google/callback - Handle OAuth callback from Google
// Creates user if new, generates JWT token, redirects to frontend
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect:"http://localhost:5173/login" }),
  googleCallback,
);

// GET /api/auth/me - Fetch current authenticated user profile
// Protected route that requires valid JWT token in cookies
authRouter.get("/me", authenticateUser, getMe)

export default authRouter;
