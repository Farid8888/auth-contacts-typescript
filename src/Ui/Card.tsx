import React from 'react'
import classes from './Card.module.css'


type C ={
    children:React.ReactNode
}



const Card=(props:C)=> {
  return (
    <div className={classes.card}>
      {props.children}
    </div>
  )
}

export default Card
