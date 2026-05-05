import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateAddToCart } from "../validator/cartValidator.js";
const cartRouter=express.Router();




cartRouter.get("/add/:productId/:variantId",authenticateUser,validateAddToCart,addToCart)

export default cartRouter;