import { useEffect, useState } from 'react'
import authService from '../src/appwrite/auth'

import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import {  loginStore, logoutStore } from '../src/store/authSlice'
import { Footer, Header } from './components/index'
import { Outlet, useNavigate } from 'react-router-dom'


function App() {
  const navigate = useNavigate();
  const status = useSelector(state=> state.auth.status)

  const [loading, setLoading] = useState(true)
  const disPatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          console.log('UserData:',userData);
          disPatch(loginStore({ userData }))
        } else {
          disPatch(logoutStore())
        }

      })
      .finally(() => setLoading(false))
  }, [status,loading])

  useEffect(()=> {
    if(loading){
      navigate('/')
    }
  },[])


  return loading ? (
    <div className='m-auto min-h-screen text-center bg-green-300'>
      <h1 className='text-4xl font-semibold text-white pt-32'>Loading...</h1>
    </div>
  ) : (
    <div className='bg-green-300 text-center mx-auto p-8 min-h-screen'>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
