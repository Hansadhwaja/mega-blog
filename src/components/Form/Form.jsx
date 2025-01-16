import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStore } from '../../store/authSlice';
import Loader from '../Loader';
import { Eye, EyeOff } from 'lucide-react';


const Form = ({ buttonText }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const submit = (data) => {
    try {
      if (buttonText === 'SignUp') {
        authService.createAccount(data)
          .then((userData) => {
            disPatch(loginStore({ userData }))
            navigate('/')
          })
      }
      else {
        authService.login(data)
          .then((userData) => {
            disPatch(loginStore({ userData }))
            navigate('/')
          })
      }
    }
    catch (error) {
      console.error(error);
    }

  }

  return (
    <form className='flex flex-col gap-2 max-w-xl m-auto border p-8 my-5 text-left rounded-xl shadow-xl gradient-bg-2' onSubmit={handleSubmit(submit)}>
      <div className={`flex flex-col gap-2 ${buttonText === 'Login' && 'hidden'}`}>
        <label htmlFor='Name' className='text-lg font-semibold'>Name</label>
        <input id='Name' type='text' placeholder='Enter Your Name' className='shadow-xl p-2 rounded-lg border border-slate-300' {...register("name")} />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='Email' className='text-lg font-semibold'>Email</label>
        <input id='Email' type='email' placeholder='Enter Your Email' className='shadow-xl p-2 rounded-lg border border-slate-300' {...register("email")} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-lg font-semibold">Password</label>
        <div className="relative">
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Enter Your Password"
            className="shadow-xl p-2 rounded-lg border border-slate-300 w-full"
            {...register("password")}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2 text-slate-500"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <p className="font-semibold text-xs text-slate-500">
          *Password must be at least 8 characters.
        </p>
      </div>


      {buttonText == 'SignUp' ? (
        <p className='text-sm lg:text-lg'>Do You have any Account ?Please <Link to={'/login'} className='text-sky-400 font-semibold underline'>Login</Link></p>
      ) : (
        <p className='text-sm lg:text-lg'>Do not have any Account ?Please <Link to={'/signup'} className='text-sky-400 font-semibold underline'>SignUp</Link></p>
      )}

      <button
        type='submit'
        className='px-10 py-2 mt-5 bg-orange-400 w-fit rounded-full text-lg font-semibold text-white flex gap-3'
        onClick={() => { setLoader(true) }}
      >

        {buttonText == 'SignUp' ?
          (
            loader ? (
              <>
                <Loader />
                <p>SigningUp...</p>
              </>
            ) : ('SignUp')
          )
          : (
            loader ? (
              <>
                <Loader />
                <p>Logging...</p>
              </>
            ) : ('Login')
          )}
      </button>
    </form>
  )
}

export default Form