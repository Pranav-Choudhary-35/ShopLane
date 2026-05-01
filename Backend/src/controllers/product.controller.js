import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";


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