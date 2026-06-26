import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import Login from './layouts/Login/Login'
import LayoutMain from './layouts/Main/LayoutMain'
import DashboardMain from './pages/Home/DashboardMain'
import Statistics from './pages/Statistics/Statistics'
import History from './pages/History/History'
import SettingsMain from './pages/Settings/SettingsMain'
import LayoutPrayer from './layouts/Prayer/LayoutPrayer'
import LayoutSport from './layouts/Sport/LayoutSport'
import LayoutLanguage from './layouts/Language/LayoutLanguage'

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
      element: <LayoutMain mode={mode} setMode={setMode}/>,
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
    },
    {
      path: "layoutPrayer",
      element: <LayoutPrayer mode={mode} setMode={setMode}/>
    },
    {
      path: "layoutSport",
      element: <LayoutSport mode={mode} setMode={setMode}/>
    },
    {
      path: "layoutLanguage",
      element: <LayoutLanguage mode={mode} setMode={setMode}/>
    }
  ])

  return(<div className={mode? "" : "dark"}>
    <RouterProvider router={router}/>
  </div>)
}

export default App
