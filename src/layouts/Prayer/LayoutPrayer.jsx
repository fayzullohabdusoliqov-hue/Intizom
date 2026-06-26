import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import "./layoutPrayer.css"

function LayoutPrayer({mode, setMode}) {
  return (<div className='body layout__prayer'>
      <Header mode={mode} setMode={setMode}/>
      <Sidebar/>
      <Outlet/>
  </div>)
}

export default LayoutPrayer
