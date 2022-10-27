import React from 'react'
import Navigation from './Navigation'


type AUXPROPS ={
    children:React.ReactNode
}


export const Layout=(props:AUXPROPS)=> {
  return (
    <div>
      <Navigation/>
       {props.children}
    </div>
  )
}

export default Layout
