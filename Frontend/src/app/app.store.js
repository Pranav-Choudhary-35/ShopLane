import authReducer from '../Features/Auth/state/auth.slice'
import productReducer from '../Features/products/state/productSlice'
import cartReducer from '../Features/cart/state/cart.slice'

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product:productReducer,
        cart:cartReducer,
    }
})