import React,{useContext} from 'react'
import classes from './Navigation.module.css'
import {Link} from 'react-router-dom'
import {Context} from '../context/context'

export default function Navigation() {
    const logged = useContext(Context).logged.token
    const logout = useContext(Context).logout
  return (
    <div className={classes.nav}>
      <h2>React Auth</h2>
      {!logged &&<div className={classes.link}>
        <Link to={'/auth'}>Login</Link>
      </div>}
      {logged && <button className={classes.btn} onClick={()=>logout()} type='button'>Logout</button>}
    </div>
  )
}
