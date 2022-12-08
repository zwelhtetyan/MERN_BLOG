import { NavLink } from 'react-router-dom';

const linkStyles = (isActive) =>
   isActive ? 'text-primary' : 'hover:text-primary';

const Header = ({ theme, themeToggler }) => {
   return (
      <header className='bg-headerBg backdrop-blur-md sticky top-0 py-2 px-4 xs:px-8 sm:px-12 shadow-sm z-10'>
         <div className='flex items-center justify-between flex-wrap'>
            <NavLink to='/' className='mr-4'>
               <img src='logo.svg' alt='logo' width='75px' />
            </NavLink>

            <nav className='flex gap-3 xs:gap-5'>
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
               <NavLink
                  to='/create'
                  className={({ isActive }) => linkStyles(isActive)}
               >
                  Create
               </NavLink>

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
