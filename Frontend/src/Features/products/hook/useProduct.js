import { setSellerProducts,setProducts } from "../state/productSlice";

import { getSellerProducts,createProduct,getAllProducts } from "../services/product.api";


import { useCallback } from "react";
import { useDispatch } from 'react-redux'

export const useProduct = () => {

    const dispatch = useDispatch();


    const handleCreateProduct = useCallback(async function handleCreateProduct(formData){
        try {
            const data = await createProduct(formData);
            return { success: true, product: data.product };
        } catch (err) {
            console.error('Create Product API Error:', {
                status: err.response?.status,
                data: err.response?.data
            });
            
            const errorResponse = err.response?.data || {};
            
            const errorObj = {
                errors: errorResponse.errors || [],
                message: errorResponse.message || err.message || 'Create product failed'
            };
            
            return { error: errorObj };
        }
    }, []);

    const fetchSellerProducts = useCallback(async function fetchSellerProducts() {
        try {
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data.products));
        } catch (err) {
            console.error('Fetch Seller Products API Error:', {
                status: err.response?.status,
                data: err.response?.data
            });
        }
    }, [dispatch]);


const fetchAllProducts = useCallback(async function fetchAllProducts() {
    try {
        const data = await getAllProducts();
        console.log(data);
        
        dispatch(setProducts(data.products));
    } catch (err) {
        console.error('Fetch All Products API Error:', {
            status: err.response?.status,
            data: err.response?.data
        });
    }
}, [dispatch]);



    return { handleCreateProduct ,fetchSellerProducts,fetchAllProducts}
}
