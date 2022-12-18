import { useRef } from 'react';
import { Link } from 'react-router-dom';

const SignUpFrom = ({ isLogin, mutate, isError, error, isLoading }) => {
   const emailRef = useRef(null);
   const passwordRef = useRef(null);

   const handleSubmit = (e) => {
      e.preventDefault();

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      mutate({ email, password });
   };

   if (isError && !error.response) throw error;

   return (
      <form onSubmit={handleSubmit}>
         <input
            ref={emailRef}
            type='text'
            placeholder='email'
            className='bg-tagBg w-full h-11 rounded-md py-2 px-4 focus-outline mb-4'
         />

         <input
            ref={passwordRef}
            type='password'
            placeholder='password'
            className='bg-tagBg w-full h-11 rounded-md py-2 px-4 focus-outline'
         />

         <p className='text-center mt-2 text-sm'>
            {isLogin ? `Don't have an account?` : 'Already have an account?'}{' '}
            <Link
               to={`/${isLogin ? 'signup' : 'login'}`}
               className='font-bold cursor-pointer'
            >
               {isLogin ? 'Register.' : 'Login'}
            </Link>
         </p>

         <button className='bg-primary px-5 py-2 rounded-md block mx-auto mt-3 text-white dark:text-black'>
            {isLogin
               ? isLoading
                  ? 'Logging in'
                  : 'Login'
               : isLoading
               ? 'Signing up'
               : 'Signup'}
         </button>

         {isError && error.response && (
            <div className='py-3 px-6 border text-sm border-red-400 bg-red-200 dark:bg-red-400 dark:border-red-700 dark:text-black rounded-md mt-4'>
               {error.response?.data?.error}
            </div>
         )}
      </form>
   );
};

export default SignUpFrom;
