import authReducer from '../Features/Auth/state/auth.slice'
import productReducer from '../Features/products/state/productSlice'

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products:productReducer
    }
})