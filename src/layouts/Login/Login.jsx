import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"
import lightLogo from "../../../public/icon/light logo.png"
import darkLogo from "../../../public/icon/dark logo.png"
import { useNavigate } from 'react-router-dom';

function Login({mode}) {
  const APIKEY = "AIzaSyBSoQog_dss1CgWGq5lTJ0g5iR1R7Waq_M"
  const [isLoginOrRegistor, setIsLoginOrRegistor] = useState(true)
  const [loginObject, setLoginObject] = useState({email: "", password: ""})
  const [registorObject, setRegistorObject] = useState({email: "", password:"",name:"", image: null})
  const [locading, setLoading] = useState(false)
  const navigate = useNavigate("")

  async function registor(registorObject){
    try{
      setLoading(true)
      if(!registorObject.email || !registorObject.password || !registorObject.name || !registorObject.image){
        toast.error("You have to change input info")
        return
      }

      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: registorObject.email,
          password: registorObject.password
        })
      })
      const data = await res.json()

      if(data){
        localStorage.setItem("token", data?.idToken)
        localStorage.setItem("localId", data?.localId)
        createAccaunt(registorObject)
        toast.success("You are creating accaunt!")
        navigate("/layout")
      }else{
        toast.error(`Error: your info have the problem`)
      }
    }catch(err){
      console.log(err.message)
      toast.error(`error ${err.message}`)
    }finally{
      setLoading(false)
      toast.info("Your loading finally")
    }
  }
  async function createAccaunt(registorObject){
    try{
      setLoading(true)
      if(!registorObject.email || !registorObject.password || !registorObject.name || !registorObject.image){
        toast.error("You have to change input info")
        return
      }

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
            email: registorObject.email,
            passwod: registorObject.password,
            name: registorObject.name,
            image: imageUrl
          })
        })
      }

      reader.readAsDataURL(registorObject.image);
    }catch(err){
      console.log(err.message)
    }finally{
      setLoading(false)
      toast.info("Your loading finally")
    }
  }

  async function login(loginObject){
    try{
      setLoading(true)
      if(!loginObject.email || !loginObject.password){
        toast.error("You have to change input info")
        return
      }

      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: loginObject.email,
          password: loginObject.password
        })
      })
      const data = await res.json()
      
      if(data){
        localStorage.setItem("token", data?.idToken)
        localStorage.setItem("localId", data?.localId)
        toast.success("Successfully logged in!")
        navigate("/layout")
      }else{
        toast.error(`Error: your info have the problem`)
      }
    }catch(err){
      console.log(err.message)
      toast.error(`error ${err.message}`)
    }finally{
      setLoading(false)
      toast.info("Your loading finally")
    }
  }
  
  return (<div className='body'>
      <main className="site__main">
        {isLoginOrRegistor && <section className="login">
          <div className="conteyner login__wrapper">
            <form className="login__form" onSubmit={(evt) => {
              evt.preventDefault()
              login(loginObject)
            }}>
              <img src={mode? lightLogo : darkLogo} alt="" className="login_logo" />
              <div className="login__content">
                <label htmlFor="login-email" className="login_label">change your email:</label>
                <input id='login-email' type="email" className="login_input" onChange={
                  (evt) => setLoginObject({...loginObject, email: evt.target.value})
                }/>
              </div>
              <div className="login__content">
                <label htmlFor="login-password" className="login_label">change your password:</label>
                <input id='login-password' type="password" className="login_input" onChange={
                  (evt) => setLoginObject({...loginObject, password: evt.target.value})
                }/>
              </div>
              <button className="login_btn">sign in</button>
              <small onClick={() => {setIsLoginOrRegistor(!isLoginOrRegistor)}} className="login_small">If you don't have an account, please register.</small>
            </form>
          </div>
          <ToastContainer/>
        </section>}
        {!isLoginOrRegistor && <section className="registor">
          <div className="conteyner registor__wraper">
            <form className="login__form" onSubmit={(evt) => {
              evt.preventDefault()
              registor(registorObject)
            }}>
              <img src={mode? lightLogo : darkLogo} alt="" className="login_logo" />
              <div className="login__content">
                <label htmlFor="email" className="login_label">change your email:</label>
                <input id='email' type="email" className="login_input" onChange={
                  (evt) => setRegistorObject({...registorObject, email: evt.target.value})
                }/>
              </div>
              <div className="login__content">
                <label htmlFor="password" className="login_label">change your password:</label>
                <input id='password' type="password" className="login_input" onChange={
                  (evt) => setRegistorObject({...registorObject, password: evt.target.value})
                }/>
              </div>
              <div className="login__content">
                <label htmlFor="name" className="login_label">change your name:</label>
                <input id='name' type="name" className="login_input" onChange={
                  (evt) => setRegistorObject({...registorObject, name: evt.target.value})
                }/>
              </div>
              <div className="login__content">
                <label htmlFor="file" className="login_label">change your image:</label>
                <input id='file' type="file" className="login_input" onChange={
                  (evt) => setRegistorObject({...registorObject, image: evt.target.files[0]})
                }/>
              </div>  
              <button className="login_btn">sign up</button>
              <small onClick={() => {setIsLoginOrRegistor(!isLoginOrRegistor)}} className="login_small">If you have an account, log in.</small>
            </form>
          </div>
          <ToastContainer/>
        </section>}
      </main>
  </div>)
}

export default Login
