import React,{useEffect} from 'react'
import Contacts from '../components/Contacts/Contacts'
import {useHook} from '../hook/useHook'
import {getAllContacts} from '../lib/api'
import LoadingSpinner from '../Ui/LoadingSpinner'
import {removeHandler} from '../lib/api'


export default function ContactsPage() {
 const {data,status,error,sendRequest} = useHook(getAllContacts)
 const {status:remStatus,sendRequest:remRequest} = useHook(removeHandler)
 useEffect(()=>{
sendRequest()
 },[sendRequest])
 useEffect(()=>{
  if(remStatus === 'SUCCESS'){
    sendRequest()
  }
 },[remStatus,sendRequest])

    const remHandler =(id:any)=>{
       remRequest(id)
    }

 if(status === 'LOADING' && !error){
    return(
        <div style={{textAlign:'center',marginTop:'5rem'}}>
        <LoadingSpinner/>
    </div>
    )
 }else if(status === 'ERROR'){
  return(
    <h2 style={{textAlign:'center'}}>{error}</h2>
  )
 }
  return (
    <div>
      <Contacts contacts={data} remove={remHandler}/>
    </div>
  )
}
