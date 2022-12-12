import { useNavigate, useRouteError } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Error = () => {
   const error = useRouteError();
   const navigate = useNavigate();

   let errorMessage = '';
   let networkError = false;

   if (error.response?.status === 404) {
      errorMessage = error.response.data.error;
   } else {
      errorMessage = error.message;
      networkError = true;
   }

   const handleClick = () => {
      if (networkError) {
         window.location.reload();
      } else {
         navigate('/');
      }
   };

   return (
      <div className='flex flex-col items-center mt-[10vh] m-4 text-sm md:text-base'>
         <img src={logo} alt='logo' className='w-20 xs:w-24' />
         <p className='mt-2 mb-1'>{errorMessage}</p>

         <button
            onClick={handleClick}
            className='py-1 rounded-md px-3 bg-primary mt-5 text-sm text-white dark:text-black'
         >
            {networkError ? 'Reload' : 'Go back home'}
         </button>
      </div>
   );
};

export default Error;
