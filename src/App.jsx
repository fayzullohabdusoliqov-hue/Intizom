import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import Login from './layouts/Login/Login'
import LayoutMain from './layouts/Main/LayoutMain'
import DashboardMain from './pages/Home/DashboardMain'
import Statistics from './pages/Statistics/Statistics'
import History from './pages/History/History'
import SettingsMain from './pages/Settings/SettingsMain'

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
    },
    {
      path: "layout",
      element: <LayoutMain/>,
      children: [
        {
          index: true,
          element: <Navigate to="dashboard"/>
        },
        {
          path: "dashboard",
          element: <DashboardMain/>
        },
        {
          path: "statistics",
          element: <Statistics/>
        },
        {
          path: "history",
          element: <History/>
        },
        {
          path: "settings",
          element: <SettingsMain/>
        }
      ]
    }
  ])

  return(<div className={mode? "" : "dark"}>
    <RouterProvider router={router}/>
  </div>)
}

export default App
