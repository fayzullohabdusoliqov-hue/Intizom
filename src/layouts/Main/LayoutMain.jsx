import React from 'react'
import "./LayoutMain.css"
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function LayoutMain({mode, setMode}) {
  return (<div className='body layout__main'>
      <Header mode={mode} setMode={setMode}/>
      <Sidebar/>~
      <Outlet/>
  </div>)
}

export default LayoutMain
