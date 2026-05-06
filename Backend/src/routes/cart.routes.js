import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateAddToCart } from "../validator/cartValidator.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";
const cartRouter=express.Router();




cartRouter.post("/add/:productId/:variantId",authenticateUser,validateAddToCart,addToCart)


cartRouter.get("/",authenticateUser,getCart);

export default cartRouter;