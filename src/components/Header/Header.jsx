import { useState } from 'react'
import authService from '../../appwrite/auth'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutStore } from '../../store/authSlice';
import { LuAlignRight } from 'react-icons/lu';
import logo from '../../assets/logo.png'
import Sidebar from './Sidebar';
import { LogOut } from 'lucide';
import { LogOutIcon } from 'lucide-react';

const Header = () => {
  const user = useSelector(state => state.auth.userData);
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = () => {
    authService.logout()
      .then(() => {
        disPatch(logoutStore())
      })
    setIsSidebarOpen(false);
    navigate('/login');
  }

  return (
    <nav className='flex justify-between ml-auto z-10 p-4 shadow-xl mb-10 font-semibold rounded-xl border-2 sticky top-0 gradient-bg-2'>
      <div className='ml-2'>
        <Link to={'/'} className='flex'>
          <img src={logo} alt='Logo' width={64} height={64} />
          <h1 className='my-auto text-4xl max-md:hidden font-semibold'>Capture</h1>
        </Link>
      </div>
      <div className='hidden sm:flex'>
        {user ? (
          <div className='flex my-auto w-full'>
            <NavLink
              to={'/myposts'}
              className={({ isActive }) => (isActive ? 'text-sky-400' : undefined)}
            >
              <p className='px-4 py-2 hover:text-sky-400 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 h-full'>My Posts</p>
            </NavLink>
            <NavLink
              to={'/addpost'}
              className={({ isActive }) => (isActive ? 'text-sky-400' : undefined)}
            >
              <p className='h-full px-4 py-2 hover:text-sky-400 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>Add Post</p>
            </NavLink>
           
              <button className='px-10 py-2 rounded-full transition duration-200 hover:bg-red-400 hover:text-white flex gap-2' onClick={handleClick}>
                <LogOutIcon />
                Logout
              </button>
           
          </div>
        ) : (
          <ul className='flex my-auto'>
            <li>
              <NavLink
                to={'/login'}
                className={({ isActive }) => (isActive ? 'text-sky-400' : undefined)}
              >
                <p className='px-4 py-2 hover:text-sky-400 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>Login</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/signup'}
                className={({ isActive }) => (isActive ? 'text-sky-400' : undefined)}
              >
                <p className='px-4 py-2 hover:text-sky-400 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>SignUp</p>
              </NavLink>
            </li>

          </ul>
        )}
      </div>

      {/* Sidebar */}
      <div className='my-auto sm:hidden'>
        <button onClick={() => setIsSidebarOpen(true)}>
          <LuAlignRight size={32} />
        </button>
        {isSidebarOpen &&
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            handleClick={handleClick}
          />

        }
      </div>
    </nav>
  )
}

export default Header