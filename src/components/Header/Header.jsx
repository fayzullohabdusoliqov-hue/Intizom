import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import lightLogo from "../../../public/icon/light logo.png"
import darkLogo from "../../../public/icon/dark logo.png"
import LoginIcon from "../../../public/icon/login icon.png"
import settingsIcon from "../../../public/icon/settings.png"
import addIcon from "../../../public/icon/add.png"
import moonIcon from "../../../public/icon/moon.png"
import sunIcon from "../../../public/icon/sun.png"
import "./Header.css"

function Header({mode, setMode}) {
  const [profile, setProfile] = useState({})
  const [add, setAdd] = useState(true)
  const token = localStorage.getItem("token")
  const localId = localStorage.getItem("localId")
  const location = useLocation()

  async function getProfile() {
    try{
      const res = await fetch(`https://intizom-251c8-default-rtdb.firebaseio.com/profile/${localId}.json?auth=${token}`)
      const data = await res.json()
      setProfile(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getProfile()
  },[])
  useEffect(() => {
    if(location.pathname === "/layout/dashboard" || location.pathname === "/layout/settings" || location.pathname === "/layout/history" || location.pathname === "/layout/statistics"){
      setAdd(false)
    }
  },[location.pathname])

  return (<header className='site__header'>
      <div className="header__logo">
        <img src={mode? lightLogo : darkLogo} width={95} alt="" className="header__logo" />
        <div className="header__content">
          <h3 className="header_title">{profile?.name}</h3>
          <small className="header_small">{profile?.email}</small>
        </div>
      </div>
      <nav className="header_navbar">
        <ul className="navbar__list">
          <li className="navbar_item"><NavLink to={"/layout"} className={"navbar_link"}>home</NavLink></li>
          <li className="navbar_item"><NavLink to={"/layoutPrayer"} className={"navbar_link"}>prayer</NavLink></li>
          <li className="navbar_item"><NavLink to={"/layoutSport"} className={"navbar_link"}>sport</NavLink></li>
          <li className="navbar_item"><NavLink to={"/layoutLanguage"} className={"navbar_link"}>language</NavLink></li>
        </ul>
      </nav>
      <div className="header__btn">
        <button className="header_btn" onClick={() => setMode(!mode)}><img src={mode? moonIcon : sunIcon} width={28} alt="" /></button>
        <button className="header_btn"><img src={LoginIcon} width={28} alt="" /></button>
        <button className="header_btn"><img src={settingsIcon} width={28} alt="" /></button>
        {add && <button className="header_btn"><img src={addIcon} width={28} alt="" /></button>}
      </div>
  </header>)
}

export default Header
