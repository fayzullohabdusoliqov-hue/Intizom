import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import Login from './layouts/Login/Login'

function App() {
  const [mode, setMode] = useState(false)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />
    },
    {
      path: "login",
      element: <Login mode={mode}/>
    }
  ])

  return(<div className={mode? "" : "dark"}>
    <RouterProvider router={router}/>
  </div>)
}

export default App
