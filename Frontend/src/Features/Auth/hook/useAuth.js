import { setUser, setLoading } from "../state/auth.slice";

import { register ,login,getMe} from "../services/auth.api";

import { useCallback } from "react";
import { useDispatch } from 'react-redux'

export const useAuth = () => {

    const dispatch = useDispatch();
    const handleRegister = useCallback(async function handleRegister({ email, contact, password, fullname, isSeller = false }) {

        try {
            const data = await register({ email, contact, password, fullname, isSeller });
            dispatch(setUser(data.user));
            return { success: true, user: data.user };
        } catch (err) {
            // Extract error response from axios error
            const errorResponse = err.response?.data || {};
            
            console.error('Register API Error:', {
                status: err.response?.status,
                data: errorResponse
            });
            
            // Build error object with validation errors and general message
            const errorObj = {
                errors: errorResponse.errors || [],
                message: errorResponse.message || err.message || 'Registration failed'
            };
            
            return { error: errorObj };
        }
    }, [dispatch]);

    const handleLogin = useCallback(async function handleLogin({email,password}){
        try {
            const data = await login({email,password});
            dispatch(setUser(data.user));
            return { success: true, user: data.user };
        } catch (err) {
            console.error('Login API Error:', {
                status: err.response?.status,
                data: err.response?.data
            });
            
            const errorResponse = err.response?.data || {};
            
            const errorObj = {
                errors: errorResponse.errors || [],
                message: errorResponse.message || err.message || 'Login failed'
            };
            
            return { error: errorObj };
        }
    }, [dispatch]);


    const handleGetMe = useCallback(async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
            
            return { success: true, user: data.user };
        } catch (err) {
            console.error('Get Me API Error:', {
                status: err.response?.status,
                data: err.response?.data
            });

            const errorResponse = err.response?.data || {};

            const errorObj = {
                errors: errorResponse.errors || [],
                message: errorResponse.message || err.message || 'Failed to fetch user details'
            };

            return { error: errorObj };
        }finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    return { handleRegister, handleLogin, handleGetMe };
}
