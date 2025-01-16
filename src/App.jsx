import { useEffect, useState } from 'react'
import authService from '../src/appwrite/auth'

import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginStore, logoutStore } from '../src/store/authSlice'
import { Footer, Header } from './components/index'
import { Outlet, useNavigate } from 'react-router-dom'
import Loader from './components/Loader'


function App() {
  const navigate = useNavigate();
  const status = useSelector(state => state.auth.status);
  const disPatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          disPatch(loginStore({ userData }))
          navigate('/')
        } else {
          disPatch(logoutStore())
          navigate('/login')
        }
      })
    setLoading(false)
  }, [status, loading]);

  // useEffect(() => {
  //   if (loading) {
  //     navigate('/')
  //   }
  // }, []);

  return loading ? (
    <div className='m-auto min-h-screen text-center gradient-bg'>
      <Loader />
    </div>
  ) : (
    <div className='text-center min-h-screen gradient-bg'>
      <div className='p-8'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )

}

export default App
