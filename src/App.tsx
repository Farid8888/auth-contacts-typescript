import React,{useContext} from 'react'
import Layout from './components/Layout/Layout'
import {Routes,Route,Navigate} from 'react-router'
import HomePage from './pages/HomePage'
import Authpage from './pages/Authpage'
import ContactsPage from './pages/ContactsPage'
import ErrorPage from './pages/ErrorPage'
import NewContactPage from './pages/NewContactPage'
import {Context} from './components/context/context'

export default function App() {
  const userId = useContext(Context).logged.userId
  console.log(userId)
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        {!userId ? <Route path='/auth' element={<Authpage/>}/> 
        : <Route path='/contacts' element={<ContactsPage/>}/>}
        {userId ? <Route path='/auth' element={<Navigate to='/contacts'/>}/>:
        <Route path='/contacts' element={<Navigate to='/auth'/>}/>}
        <Route path='/new-contact' element={<NewContactPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Layout>
  )
}
