import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStore } from '../../store/authSlice';


const Form = ({ buttonText }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const [loaderButtonText, setLoaderButtonText] = useState(buttonText)


  const submit = (data) => {
    try {
      if (buttonText === 'SignUp') {
        authService.createAccount(data)
          .then((userData) => {
            disPatch(loginStore({ userData }))
            alert('SignedUp Successfully')
            navigate('/')
          })
      }
      else {
        authService.login(data)
          .then((userData) => {
            disPatch(loginStore({ userData }))
            alert('LoggedIn Successfully')
            navigate('/')
          })
      }
    }
    catch (error) {
      console.error(error);
    }

  }

  return (
    <form className='flex flex-col gap-2 max-w-xl m-auto bg-white p-8 my-5 text-left rounded-xl' onSubmit={handleSubmit(submit)}>
      <div className={`flex flex-col gap-2 ${buttonText === 'Login' && 'hidden'}`}>
        <label className='text-lg font-semibold'>Name</label>
        <input type='text' placeholder='Enter Your Name' className='shadow-xl p-2 rounded-lg border border-slate-300' {...register("name")} />
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-lg font-semibold'>Email</label>
        <input type='email' placeholder='Enter Your Email' className='shadow-xl p-2 rounded-lg border border-slate-300' {...register("email")} />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-lg font-semibold'>Password</label>
        <input type='password' placeholder='Enter Your Password' className='shadow-xl p-2 rounded-lg border border-slate-300' {...register("password")} />
        <p className='font-semibold text-[12px]'>*Password must be of 8 characters.</p>
      </div>

      <button type='submit' className='px-4 py-2 mt-5 bg-orange-400 w-fit rounded-lg text-lg font-semibold text-white ml-[40%]' onClick={()=> {
        setLoader(true)
        if (buttonText === 'SignUp'){
          setLoaderButtonText('SigningUp....')
        }
        else{
          setLoaderButtonText('LoggingIn....')
        }
        
        }}>{loaderButtonText}</button>
    </form>
  )
}

export default Form