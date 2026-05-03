import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

function parseAttributes(rawAttributes) {
    if (!rawAttributes) {
        return {};
    }

    let attributes;

    try {
        attributes = typeof rawAttributes === "string"
            ? JSON.parse(rawAttributes)
            : rawAttributes;
    } catch {
        const error = new Error("attributes must be an object");
        error.statusCode = 400;
        throw error;
    }

    if (
        !attributes ||
        Array.isArray(attributes) ||
        typeof attributes !== "object"
    ) {
        const error = new Error("attributes must be an object");
        error.statusCode = 400;
        throw error;
    }

    return Object.fromEntries(
        Object.entries(attributes).map(([key, value]) => [key, String(value)])
    );
}


export async function createProduct(req, res) {
    try {
        const { title, description, priceAmount, priceCurrency } = req.body;
        const seller = req.user;

        const images = await Promise.all(
            req.files.map(async (file) => {
                return await uploadFile({
                    buffer: file.buffer,
                    fileName: file.originalname
                });
            })
        );

        const product = await productModel.create({
            title,
            description,
            price: {
                amount: priceAmount,
                currency: priceCurrency || "INR"
            },
            images,
            seller: seller._id
        });

        res.status(201).json({
            message: "product created successfully",
            success: true,
            product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}



export async function getSellerProducts(req, res) {
  try {
    const seller = req.user;
    const products = await productModel.find({ seller: seller._id });

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: "Validation Error",
        errors: Object.values(error.errors).map(err => ({ param: err.path, msg: err.message }))
      });
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
}


export async function getAllProducts(req,res){
    try {
        const products = await productModel.find();
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
} 


export async function getProductDetails(req,res){
    try {
        const {productId} = req.params;
        const product = await productModel.findById(productId);
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export async function addProductVariant(req,res){
    try {
        const { productId } = req.params;

        const product = await productModel.findOne({
            _id: productId,
            seller: req.user._id
        });

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const files = req.files || [];
        const images = await Promise.all(files.map(async(file)=>{
            return await uploadFile({
                buffer:file.buffer,
                fileName:file.originalname
            });
        }));

        const attributes = parseAttributes(req.body.attributes);
        const priceAmount = Number(req.body.priceAmount || product.price.amount);
        const stock = Number(req.body.stock || 0);

        const variant = {
            images,
            stock,
            attributes,
            price: {
                amount: priceAmount,
                currency: req.body.priceCurrency || product.price.currency || "INR"
            }
        };

        product.variants.push(variant);
        await product.save();

        res.status(201).json({
            success: true,
            message: "Variant added successfully",
            variant: product.variants[product.variants.length - 1]
        });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode ? error.message : "Something went wrong"
        });
    }
}
