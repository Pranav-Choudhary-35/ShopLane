import { createBrowserRouter } from 'react-router'
import Register from '../Features/Auth/Pages/Register'
import Login from '../Features/Auth/Pages/Login'
import CreateProduct from '../Features/products/pages/CreateProduct'
import Dashboard from '../Features/products/pages/Dashboard'
import Protected from '../Features/Auth/Components/Protected'

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
                element: <Protected role="seller"><Dashboard /></Protected>
            },
             {
        path: '/seller/create-product',
        element: <Protected role="seller"><CreateProduct /></Protected>
    },
        ]

    }

])