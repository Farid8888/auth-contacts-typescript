
 import {useReducer,useCallback} from 'react'


type Obj ={
  name:string,
  number:string,
  id?:string
}
type ACT ={
  payload?:any,
  type:string
}
type INITIAL={
  data:Obj[],
  error:any,
  status:any
}

const initialState:INITIAL ={
  data:[],
  error:null,
  status:''
}


const reducer =(state=initialState,action:ACT)=>{
  switch(action.type){
    case('SEND'):return {...state,status:'LOADING'}
    case('SUCCESS'):return {...state,data:action.payload,status:'SUCCESS'}
    case('ERROR'):return {...state,status:'ERROR',error:action.payload}
    default: return state
  }
  
}


export const useHook=(requestFunction:any)=>{
 const [hookState,dispatch] = useReducer(reducer,initialState) 
const sendRequest =useCallback(async(requestData?:any)=>{
  dispatch({type:'SEND'})
  try{
    const data = await requestFunction(requestData) 
    dispatch({type:'SUCCESS',payload:data})
  }catch(e:any){
    dispatch({type:'ERROR',payload:e})
  }
},[requestFunction])
return{
  ...hookState,
  sendRequest
}
}

