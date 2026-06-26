import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import "./layoutLanguage.css"

function LayoutLanguage({mode, setMode}) {
  return (<div className='body'>
      <Header mode={mode} setMode={setMode}/>
      <Sidebar/>
      <Outlet/>
  </div>)
}

export default LayoutLanguage
