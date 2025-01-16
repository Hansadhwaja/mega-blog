
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useSelector } from 'react-redux';
import { LogOutIcon } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, handleClick }) => {
  const user = useSelector(state => state.auth.userData);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  }

  return (
    <div className={`fixed inset-y-0 left-0 sm:hidden rounded-r-xl gradient-bg-2 border-r-2 transition-[width] ease-in-out shadow-xl h-screen ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
      <div className="relative">
        <button
          className="absolute right-4 top-4 text-2xl"
          onClick={closeSidebar}
        >
          X
        </button>
        <Link to={'/'} className="flex pt-12 px-2" onClick={closeSidebar}>
          <img src={logo} alt="Logo" width={42} height={42} />
          <p className="text-2xl my-auto">Mega Blog</p>
        </Link>
      </div>
      <div className="sm:hidden flex flex-col mt-12">
        {user ? (
          <ul className="flex my-auto flex-col gap-4">
            <li>
              <NavLink
                to={'/myposts'}
                onClick={closeSidebar}
                className={({ isActive }) => (isActive ? 'text-sky-400' : undefined)}
              >
                <p className="px-4 py-2 hover:text-sky-400 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110">
                  My Posts
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/addpost'}
                onClick={closeSidebar}
                className={({ isActive }) => (isActive ? 'text-sky-400' : undefined)}
              >
                <p className="px-4 py-2 hover:text-sky-400 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110">
                  Add Post
                </p>
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="flex my-auto flex-col gap-4">
            <li>
              <NavLink
                to={'/login'}
                onClick={closeSidebar}
                className={({ isActive }) => (isActive ? 'text-sky-400' : undefined)}
              >
                <p className="px-4 py-2 hover:text-sky-400 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110">
                  Login
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/signup'}
                onClick={closeSidebar}
                className={({ isActive }) => (isActive ? 'text-sky-400' : undefined)}
              >
                <p className="px-4 py-2 hover:text-sky-400 transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110">
                  SignUp
                </p>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      {user && (
        <div className='h-full relative ml-12'>
          <button className='absolute bottom-64 px-10 py-2 rounded-full transition duration-200 hover:bg-red-400 hover:text-white flex gap-2' onClick={handleClick}>
            <LogOutIcon />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Sidebar