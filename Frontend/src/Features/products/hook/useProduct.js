import { setSellerProducts } from "../state/productSlice";

import { getSellerProducts,createProduct } from "../services/product.api";


import { useDispatch } from 'react-redux'

export const useProduct = () => {

    const dispatch = useDispatch();


        async function handleCreateProduct(formData){
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
    }

    async function fetchSellerProducts() {
        try {
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data.products));
        } catch (err) {
            console.error('Fetch Seller Products API Error:', {
                status: err.response?.status,
                data: err.response?.data
            });
        }
    }



    return { handleCreateProduct ,fetchSellerProducts}
}