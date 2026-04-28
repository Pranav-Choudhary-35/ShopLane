import { createBrowserRouter } from 'react-router'
import Register from '../Features/Auth/Pages/Register'
import Login from '../Features/Auth/Pages/Login'

export const routes = createBrowserRouter([
   
        {
        path: '/',
        element:<h1>home</h1>
    },
   
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register />
    },

])