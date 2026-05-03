import { createBrowserRouter } from 'react-router'
import Register from '../Features/Auth/Pages/Register'
import Login from '../Features/Auth/Pages/Login'
import CreateProduct from '../Features/products/pages/CreateProduct'
import Dashboard from '../Features/products/pages/Dashboard'
import Protected from '../Features/Auth/Components/Protected'
import Home from '../Features/products/pages/Home'
import ProductDetail from '../Features/products/pages/ProductDetail'
import SellerProductDetails from '../Features/products/pages/SellerProductDetails'

export const routes = createBrowserRouter([

    {
        path: '/',
        element: <Home />
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
                element: <Protected role="seller"><Dashboard /></Protected>
            },
             {
        path: '/seller/create-product',
        element: <Protected role="seller"><CreateProduct /></Protected>
    },
    {
        path: "/seller/product/:productId",
        element: <Protected role="seller"><SellerProductDetails /></Protected>
    }

        ]

    },{
        path:"/product/:productId",
        element: <ProductDetail />
    }

])