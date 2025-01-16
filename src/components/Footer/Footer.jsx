import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year=new Date().getFullYear();
  return (
    <footer className='flex rounded-xl shadow-xl mt-5 p-4 gradient-bg-2'>
      <div className='flex flex-col w-full'>
        <div className='p-2 my-3 w-full'>
          <Link to={'/'} className='flex'>
            <img src={logo} alt='Logo' width={42} height={42} />
            <p className='text-2xl my-auto font-semibold'>Capture</p>
          </Link>
        </div>
        <div className='flex flex-wrap gap-5 border-t-2 border-zinc-400 p-3'>
          <ul className='flex flex-col text-slate-500'>
            <li className='font-bold text-xl'>COMPANY</li>
            <li>Features</li>
            <li>Prices</li>
            <li>Press Kit</li>
            <li>Affiliate Program</li>
          </ul>
          <ul className='flex flex-col text-slate-500'>
            <li className='font-bold text-xl'>SUPPORT</li>
            <li>Account</li>
            <li>Help</li>
            <li>Contact Us</li>
            <li>Customer Support</li>
          </ul>
          <ul className='flex flex-col text-slate-500'>
            <li className='font-bold text-xl'>LEGALS</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Licensing</li>
          </ul>
        </div>
        <p className='mt-3'>© Copyright {year}. All Rights Reserved.</p>
      </div>

    </footer>
  )
}

export default Footer