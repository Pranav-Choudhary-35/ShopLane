import { Router } from "express";
import multer from "multer";
import { createProduct, getSellerProducts,getProductDetails,getAllProducts, addProductVariant} from "../controllers/product.controller.js";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProductValidator } from "../validator/product.validator.js";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

const productRouter = Router();

productRouter.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  createProductValidator,

  createProduct,
);

//For fetch products of a seller
productRouter.get("/seller", authenticateSeller, getSellerProducts);

//For fetch all products

productRouter.get('/',getAllProducts);

//for fetch single product details

productRouter.get('/:productId',getProductDetails);


/**
 * @route POST /api/products/:productId/variants
 * @description Add a new variant to a product
 * @access Private (Seller)
 */

productRouter.post('/:productId/variants', authenticateSeller,upload.array("images", 7), addProductVariant); 

export default productRouter;