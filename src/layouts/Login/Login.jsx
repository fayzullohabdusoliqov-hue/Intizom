import React, { useEffect, useRef, useState } from 'react'
import "./Login.css"
import lightLogo from "../../../public/icon/light logo.png"
import darkLogo from "../../../public/icon/dark logo.png"

function Login({mode}) {
  const APIKEY = "AIzaSyBSoQog_dss1CgWGq5lTJ0g5iR1R7Waq_M"
  const [isLoginOrRegistor, setIsLoginOrRegistor] = useState(true)
  const loginEmail = useRef(null)
  const loginPassword = useRef(null)
  const registorEmail = useRef(null)
  const registerPassword = useRef(null)
  const registerName = useRef(null)
  const registerImage = useRef(null)

  async function registor(email, password, name, image){
    try{
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      const data = await res.json()
      localStorage.setItem("token", data?.idToken)
      localStorage.setItem("localId", data?.localId)

      createAccaunt(email, password, name, image)
    }catch(err){
      console.log(err.message)
    }
  }
  async function createAccaunt(email, password, name, image){
    try{
      const reader = new FileReader()
      const token = localStorage.getItem("token")
      const localId = localStorage.getItem("localId")

      reader.onload = () => {
        const imageUrl = reader.result;

        fetch(`https://intizom-251c8-default-rtdb.firebaseio.com/profile/${localId}.json?auth=${token}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            passwod: password,
            name: name,
            image: imageUrl
          })
        })
      }

      reader.readAsDataURL(image);
    }catch(err){
      console.log(err.message)
    }
  }

  async function login(email, password){
    try{
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      const data = await res.json()
      localStorage.setItem("token", data?.idToken)
      localStorage.setItem("localId", data?.localId)
    }catch(err){
      console.log(err.message)
    }
  }
  return (<div className='body'>
      <main className="site__main">
        {isLoginOrRegistor && <section className="login">
          <div className="conteyner login__wrapper">
            <form className="login__form" onSubmit={(evt) => {
              evt.preventDefault()
              login(loginEmail.current.value, loginPassword.current.value)
            }}>
              <img src={mode? lightLogo : darkLogo} alt="" className="login_logo" />
              <div className="login__content">
                <label htmlFor="login-email" className="login_label">change your email:</label>
                <input id='login-email' type="email" className="login_input" ref={loginEmail}/>
              </div>
              <div className="login__content">
                <label htmlFor="login-password" className="login_label">change your password:</label>
                <input id='login-password' type="password" className="login_input" ref={loginPassword}/>
              </div>
              <button className="login_btn">sign in</button>
              <small onClick={() => {setIsLoginOrRegistor(!isLoginOrRegistor)}} className="login_small">If you don't have an account, please register.</small>
            </form>
          </div>
        </section>}
        {!isLoginOrRegistor && <section className="registor">
          <div className="conteyner registor__wraper">
            <form className="login__form" onSubmit={(evt) => {
              evt.preventDefault()
              registor(registorEmail.current.value, registerPassword.current.value, registerName.current.value, registerImage.current.files[0])
            }}>
              <img src={mode? lightLogo : darkLogo} alt="" className="login_logo" />
              <div className="login__content">
                <label htmlFor="email" className="login_label">change your email:</label>
                <input id='email' type="email" className="login_input" ref={registorEmail}/>
              </div>
              <div className="login__content">
                <label htmlFor="password" className="login_label">change your password:</label>
                <input id='password' type="password" className="login_input" ref={registerPassword}/>
              </div>
              <div className="login__content">
                <label htmlFor="name" className="login_label">change your name:</label>
                <input id='name' type="name" className="login_input" ref={registerName}/>
              </div>
              <div className="login__content">
                <label htmlFor="file" className="login_label">change your image:</label>
                <input id='file' type="file" className="login_input" ref={registerImage}/>
              </div>  
              <button className="login_btn">sign up</button>
              <small onClick={() => {setIsLoginOrRegistor(!isLoginOrRegistor)}} className="login_small">If you have an account, log in.</small>
            </form>
          </div>
        </section>}
      </main>
  </div>)
}

export default Login
