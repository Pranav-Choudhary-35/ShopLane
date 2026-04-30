import { createBrowserRouter } from 'react-router'
import Register from '../Features/Auth/Pages/Register'
import Login from '../Features/Auth/Pages/Login'
import CreateProduct from '../Features/products/pages/CreateProduct'
import Dashboard from '../Features/products/pages/Dashboard'

export const routes = createBrowserRouter([

    {
        path: '/',
        element: <h1>home</h1>
    },
   
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },{
        path:"/seller",
        children:[
            {
                path: "/seller/dashboard",
                element: <Dashboard />
            },
             {
        path: '/seller/create-product',
        element: <CreateProduct />
    },
        ]

    }

])