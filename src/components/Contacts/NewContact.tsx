import React,{useRef,useEffect} from 'react'
import classes from './New.module.css'
import {addContact} from '../../lib/api'
import {useHook} from '../../hook/useHook'
import {useNavigate} from 'react-router'
import LoadingSpinner from '../../Ui/LoadingSpinner'

export default function NewContact() {
const {error,status,sendRequest} =useHook(addContact)
const navigate = useNavigate()
const nameRef = useRef<HTMLInputElement>(null)
const numberRef = useRef<HTMLInputElement>(null)
const submitHandler =(e:React.FormEvent)=>{
e.preventDefault()
const obj={
    name:nameRef.current!.value,
    number:numberRef.current!.value
}
sendRequest(obj)

}

useEffect(()=>{
    if(status==='SUCCESS'){
        return navigate('/contacts')
    }
},[status,navigate])
if(status === 'LOADING' && !error){
    return(
        <div style={{textAlign:'center',marginTop:'3rem'}}>
          <LoadingSpinner/>
        </div>
    )
}else if(status === 'ERROR'){
    return(
        <div style={{textAlign:'center',marginTop:'4rem'}}>
            {error}
        </div>
    )
}
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.item}>
        <label htmlFor='name'>Name</label>
        <input id='name' ref={nameRef}/>
      </div>
      <div className={classes.item}>
        <label htmlFor='number'>Number</label>
        <input id='number' type='number' ref={numberRef}/>
      </div>
      <div className={classes.btn}>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}
