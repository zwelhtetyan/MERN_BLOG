import SignUpFrom from '../components/SignUpFrom';
import { useMutation } from 'react-query';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Signup = () => {
   // auth context
   const { dispatch } = useAuthContext();

   // react router
   const navigate = useNavigate();

   // react query
   const { mutate, isLoading, isError, error } = useMutation(
      'signup',
      (userInfo) => signup(userInfo),
      {
         onSuccess: (res) => {
            const { name, token } = res.data;

            dispatch({ type: 'LOGIN', payload: { name, token } });
            localStorage.setItem('user', JSON.stringify({ name, token }));
            navigate('/');
         },
      }
   );

   return (
      <div className='flex flex-col items-center min-h-screen bg-mainBg'>
         <div className='mt-[20vh] m-2 max-w-md bg-cardBg rounded-md p-4'>
            <h1 className='text-center font-bold text-3xl mb-6'>Sign up</h1>
            <SignUpFrom
               mutate={mutate}
               isError={isError}
               error={error}
               isLoading={isLoading}
            />
         </div>
      </div>
   );
};

export default Signup;
