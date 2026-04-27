import { createBrowserRouter } from 'react-router'
import Register from '../Features/Auth/Pages/Register'
import Login from '../Features/Auth/Pages/Login'

export const routes = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register />
    }
])