const url ='https://authentication-24631-default-rtdb.firebaseio.com/'


export const getAllContacts = async()=>{
const response = await fetch(`${url}/contacts.json`)
if(!response.ok){
    throw new Error('Could not fetch data')
}
const data = await response.json()
let items =[]
for(let key in data){
items.push({
    name:data[key].name,
    number:data[key].number,
    id:key
})
}
return items
}




type Obj ={
    name:string,
    number:string,
    id?:string
}


export const addContact = async(obj:Obj)=>{
const response = await fetch(`${url}/contacts.json`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(obj)
})
const data = await response.json()
if(!response.ok){
    throw new Error(data.message || 'Response failed')
}
return null
}


export const removeHandler =async(id:any)=>{
const response = await fetch(`https://authentication-24631-default-rtdb.firebaseio.com/contacts/${id}.json`,{
    method:'DELETE'
})
const data = await response.json()
if(!response.ok){
    throw new Error(data.message || 'Quote not removed')
}
return null
}
