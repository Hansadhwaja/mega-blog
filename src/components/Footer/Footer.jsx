import React from 'react'
import { AiFillMediumCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='flex bg-green-400 shadow-xl mt-5 p-4'>
      <div className='flex flex-col w-full'>
        <div className='p-2 my-3 w-full'>
          <Link to={'/'}>
            <AiFillMediumCircle size={40} />
          </Link>
        </div>
        <div className='flex flex-wrap gap-5 border-t-2 border-green-200 p-3'>
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
        <div className='mt-3'>
          <p className='mt-auto'>© Copyright 20234. All Rights Reserved.</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer