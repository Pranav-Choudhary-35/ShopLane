import '../app/index.css'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import { useAuth } from '../Features/Auth/hook/useAuth'
import { useEffect } from 'react'

function App() {

    const {handleGetMe} = useAuth();
    useEffect(() => {
        handleGetMe();
    }, [handleGetMe])
  return (
    <RouterProvider router={routes} >
      <h1 className="text-3xl font-bold underline">app</h1>

    </RouterProvider>
  )
}

export default App
