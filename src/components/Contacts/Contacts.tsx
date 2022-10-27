import React from 'react'
import ContactItem from'./ContactItem'
import classes from './Contacts.module.css'
import {useNavigate} from 'react-router'


type C ={
    number:string,
    name:string,
    id:string
}

type Conc = {
contacts:C[],
remove:(id:any)=>void
}

const Contacts:React.FC<Conc>=(props)=> {
    const navigate =useNavigate()
    const addHandler =()=>{
     navigate('/new-contact')
    }
    let content
    if(props.contacts.length !== 0){
        content=props.contacts.map(contact=>{
            return <ContactItem key={contact.id} id={contact.id} number={contact.number} name={contact.name} remove={props.remove}/>
          })
    }else{
        content = <div style={{textAlign:'center',marginTop:'6rem',marginBottom:'2rem'}}>
            No contacts added yet
        </div>
    }
  return (
    <div className={classes.items}>
      {content}
      <button type='button' onClick={addHandler}>Add</button>
    </div>
  )
}

export default Contacts
