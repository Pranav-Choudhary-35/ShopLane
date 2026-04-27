import authReducer from '../Features/Auth/state/auth.slice'

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})