import { Router } from "express";
import multer from "multer"
import { createProduct } from '../controllers/product.controller.js';
import { authenticateSeller } from '../middleware/auth.middleware.js'

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }
})



const productRouter = Router();





productRouter.post("/", authenticateSeller, upload.array('images', 7), createProduct);



export default productRouter;