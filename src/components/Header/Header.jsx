import React, { useEffect, useRef, useState } from 'react'
import authService from '../../appwrite/auth'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutStore } from '../../store/authSlice';
import { HiMenuAlt1 } from "react-icons/hi";
import { AiFillMediumCircle } from "react-icons/ai";

const Header = () => {
  const user = useSelector(state => state.auth.userData);
  const disPatch = useDispatch();
  const navigate = useNavigate();


  const navItems = [
    {
      'label': 'Home',
      'link': '/',
      'authenticate': true
    },
    {
      'label': 'My Posts',
      'link': '/allposts',
      'authenticate': user
    },
    {
      'label': 'Add Post',
      'link': '/addpost',
      'authenticate': user
    },
    {
      'label': 'Login',
      'link': '/login',
      'authenticate': !user
    },
    {
      'label': 'SignUp',
      'link': '/signup',
      'authenticate': !user
    },
  ]

  const handleClick = () => {
    authService.logout()
      .then(() => {
        disPatch(logoutStore())
      })
    navigate('/')
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <nav className='flex ml-auto  p-4 shadow-xl bg-green-400 mb-10 text-white font-semibold'>
      <button className='my-auto sm:hidden' onClick={toggleSidebar}>
        <HiMenuAlt1 size={32} />
      </button>

      <div className='p-2'>
        <Link to={'/'}>
          <AiFillMediumCircle size={40} />
        </Link>
      </div>
      <ul className='hidden sm:flex ml-auto p-2 sm:text-lg gap-2'>
        {navItems.map((item) =>
          item.authenticate &&
          (
            <NavLink
              to={item.link}
              key={item.label}
              className={({ isActive }) => isActive ? 'bg-orange-500 rounded-xl ' : 'hover:bg-orange-600 rounded-xl'}
            >
              <li className='px-4 py-2 '>{item.label}</li>
            </NavLink>

          ))}



      </ul>
      {user && (
        <div className='my-auto ml-auto sm:ml-0'>
          <button className='px-4 py-2 rounded-lg text-lg hover:bg-green-600' onClick={handleClick}>Logout</button>
        </div>
      )}

      {isSidebarOpen && (
        <div ref={sidebarRef} className={`fixed inset-y-0 left-0 bg-green-300 border-r-2 z-10 text-white transform transition-transform duration-100 ease-in-out ${isSidebarOpen ? ' w-64' : 'w-0'}`}>
          <div className="p-4">
            <div className='p-2 mt-10'>
              <Link to={'/'} onClick={toggleSidebar}>
                <AiFillMediumCircle size={40} />
              </Link>
            </div>
            <ul className='flex flex-col ml-auto p-2 text-xl gap-2 mt-10'>
              {navItems.map((item) =>
                item.authenticate &&
                (
                  <NavLink
                    to={item.link}
                    key={item.label}
                    onClick={toggleSidebar}
                    className={({ isActive }) => isActive ? 'bg-orange-500 rounded-xl ' : 'hover:bg-orange-600 rounded-xl'}
                  >
                    <li className='px-4 py-2 '>{item.label}</li>
                  </NavLink>

                ))}



            </ul>
          </div>
        </div>

      )}


    </nav>
  )
}

export default Header