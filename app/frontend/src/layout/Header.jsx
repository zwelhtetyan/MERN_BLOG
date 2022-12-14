import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useAuthContext } from '../context/AuthContext';

const linkStyles = (isActive) =>
   isActive ? 'text-primary' : 'hover:text-primary';

const Header = ({ theme, themeToggler }) => {
   const { user, dispatch } = useAuthContext();

   const logoutHandler = () => {
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
   };

   return (
      <header className='bg-headerBg backdrop-blur-md sticky top-0 py-2 px-4 xs:px-8 sm:px-12 shadow-sm z-10'>
         <div className='flex items-center justify-between flex-wrap'>
            <NavLink to='/' className='mr-4'>
               <img src={logo} alt='logo' width='75px' />
            </NavLink>

            <nav className='flex items-center gap-3 xs:gap-5'>
               <NavLink
                  to='/'
                  className={({ isActive }) => linkStyles(isActive)}
               >
                  Home
               </NavLink>

               <NavLink
                  to='/about'
                  className={({ isActive }) => linkStyles(isActive)}
               >
                  About
               </NavLink>

               {!user && <NavLink to='/login'>Login</NavLink>}

               {user && (
                  <NavLink
                     to='/create'
                     className={({ isActive }) => linkStyles(isActive)}
                  >
                     Create
                  </NavLink>
               )}

               {/* logout icon */}
               {user && (
                  <div className='cursor-pointer' onClick={logoutHandler}>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-log-out hover:stroke-primary'
                     >
                        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                        <polyline points='16 17 21 12 16 7'></polyline>
                        <line x1='21' y1='12' x2='9' y2='12'></line>
                     </svg>
                  </div>
               )}

               {/* theme icon */}
               <div onClick={themeToggler}>
                  {theme === 'dark' ? (
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-sun cursor-pointer hover:stroke-primary'
                        width='25'
                        height='25'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='#ffffff'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <circle cx='12' cy='12' r='4' />
                        <path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7' />
                     </svg>
                  ) : (
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-moon cursor-pointer hover:stroke-primary'
                        width='23'
                        height='23'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='#000000'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z' />
                     </svg>
                  )}
               </div>
            </nav>
         </div>
      </header>
   );
};

export default Header;
