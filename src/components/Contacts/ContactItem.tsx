import React from 'react'
import classes from './ContactsItem.module.css'


type Item={
    name:string,
    number:string,
    id:string,
    remove:(id:any)=>void
}

const ContactItem:React.FC<Item>=({name,number,id,remove})=> {
  return (
    <div className={classes.items}>
        <div className={classes.item}>
        <p>Name: {name}</p>
        <p>Number: {number}</p>
        </div>
        <div className={classes.btn}>
            <button type='button' onClick={()=>remove(id)}>Remove</button>
        </div>
    </div>
  )
}

export default ContactItem
