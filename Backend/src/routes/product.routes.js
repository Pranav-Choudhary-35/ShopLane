import { Router } from "express";
import multer from "multer";
import { createProduct, getSellerProducts, getProductDetails, getAllProducts, addProductVariant} from "../controllers/product.controller.js";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProductValidator } from "../validator/product.validator.js";

// Multer configuration for image uploads
// Uses memory storage, limits file size to 5MB, allows up to 7 images per request
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const productRouter = Router();

// POST /api/products - Create new product listing
// Protected route for authenticated sellers only
// Handles up to 7 product images, validates title, description, and pricing
productRouter.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  createProductValidator,
  createProduct,
);

// GET /api/products/seller - Fetch all products created by authenticated seller
// Protected route, returns products owned by the logged-in seller
productRouter.get("/seller", authenticateSeller, getSellerProducts);

// GET /api/products - Fetch all products from all sellers
// Public route for product browsing and search
productRouter.get('/', getAllProducts);

// GET /api/products/:productId - Fetch detailed information for a single product
// Public route, returns product with all variants, images, and pricing
productRouter.get('/:productId', getProductDetails);

// POST /api/products/:productId/variants - Add new variant to existing product
// Protected route for product seller, handles variant images and attributes
// Allows specification of variant-specific price, stock, and attributes (Size, Color, etc)
productRouter.post('/:productId/variants', authenticateSeller, upload.array("images", 7), addProductVariant); 

export default productRouter;