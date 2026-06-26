import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import "./layoutSport.css"

function LayoutSport({mode, setMode}) {
  return (<div className='body'>
      <Header mode={mode} setMode={setMode}/>
      <Sidebar/>
      <Outlet/>
  </div>)
}

export default LayoutSport
