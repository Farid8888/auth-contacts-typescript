import {createContext,useState,useEffect} from 'react'
import {useNavigate} from 'react-router'


type Child = {
  children:React.ReactNode
}

type Obj ={
  token:string,
  userId:string,
  expireIn:string
}


export const Context = createContext({
    logged:{
      token:'',
       userId:'',
     expireIn:''
    },
    logHandler:(obj:Obj)=>{},
    logout:()=>{}
})


export const ContextProvider =(props:Child)=>{
  const navigate = useNavigate()
const [log,setLog] = useState<Obj>({
  token:'',
  userId:'',
  expireIn:''
})

const calculating=(exp:string)=>{
  const expire = new Date(exp).getTime()
  const currentDate = new Date().getTime()
  const newExpire = expire - currentDate
  return newExpire
}
let timer:any

const logout =()=>{
  clearTimeout(timer)
  setLog({
    token:'',
    userId:'',
    expireIn:''
  })
  localStorage.removeItem('items')
  navigate('/auth')
}

const logIn =(obj:Obj)=>{
  localStorage.setItem('items',JSON.stringify(obj))
  const exp = calculating(obj.expireIn)
  timer = setTimeout(()=>{
    logout()
  },exp)
setLog(obj)
}
useEffect(()=>{
const items = localStorage.getItem('items')
if(items){
  const parsed = JSON.parse(items)
  setLog(parsed)
}
},[])

  return(
    <Context.Provider value={{logged:log,logHandler:logIn,logout:logout}}>
        {props.children}
    </Context.Provider>
  )
}

