import axios from "axios";


const API_URL = "/api/products";

const productApiInstance=axios.create({
    baseURL: API_URL,
withCredentials:true
})


export const createProduct = async (formData) => {

const response = await productApiInstance.post("/", formData)
return response.data;
}


export const getSellerProducts = async () => {

const response = await productApiInstance.get("/seller")
return response.data;

}

