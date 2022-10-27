import React,{useState,useRef,useContext,useEffect} from 'react'
import Card from '../../../Ui/Card'
import classes from './Auth.module.css'
import {Context} from '../../context/context'
import {useNavigate} from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

type Obj ={
  token:any,
  userId:any,
  expireIn:any
}

export default function Auth() {
  const navigate = useNavigate()
const [err,setErr] = useState('')
const [log,setLog] = useState(false)
const login = useContext(Context).logHandler
const switchHandler =()=>{
setLog(prevst=>!prevst)
}
const emailRef = useRef<HTMLInputElement>(null)
const passwordRef = useRef<HTMLInputElement>(null)
const submitHandler =(e:React.FormEvent)=>{
  e.preventDefault()
const objBody={
  email:emailRef.current!.value,
  password:passwordRef.current!.value,
  returnSecureToken:true
}
let url
if(!log){
  url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxjZWy_jPeAhtycK-gdONvDToWrViZrco`
}else{
  url =`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxjZWy_jPeAhtycK-gdONvDToWrViZrco`
  }
  fetch(url,{
    method:'POST',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify(objBody)
  }).then(response=>{
    if(!response.ok){
    return response.json().then(err=>{
      throw new Error(err.error.message)
    })
    }
    return response.json()
  }).then(data=>{
    const currentTime = new Date().getTime()
    const exp = currentTime + parseInt(data.expiresIn)*1000
    const obj:Obj={
      token:data.idToken,
      userId:data.localId,
      expireIn:exp
    }
    login(obj)
    navigate('/contacts')
  }).catch(e=>{
  
    setErr(e.message)
  })
}

useEffect(()=>{
  if(err){
    toast.error(err)
  }
},[err])

  return (
    <Card>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>{!log ? `Login` : 'Sign Up'}</h2>
        <div>
            <label htmlFor='login'>Your Email</label>
            <input id='login' required ref={emailRef}/>
        </div>
        <div>
            <label htmlFor='login'>Your Password</label>
            <input id='login' type='password' required ref={passwordRef}/>
        </div>
        <div>
            <button type='submit'>{!log ? `Login` : 'Create Account '}</button>
        </div>
        <p onClick={switchHandler}>{!log ? 'Create new account' : 'Log with existing account'}</p>
      </form>
    </Card>
  )
}
