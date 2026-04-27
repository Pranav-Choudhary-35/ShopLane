import '../app/index.css'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'

function App() {

  return (
    <RouterProvider router={routes} >
      <h1 className="text-3xl font-bold underline">app</h1>

    </RouterProvider>
  )
}

export default App
