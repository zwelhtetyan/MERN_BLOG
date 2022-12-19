import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import SignUpFrom from '../components/SignUpFrom';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
   // auth context
   const { dispatch } = useAuthContext();

   // react router
   const navigate = useNavigate();

   // react query
   const { mutate, isLoading, isError, error } = useMutation(
      'login',
      ({ email, password }) => login({ email, password }),
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
            <h1 className='text-center font-bold text-3xl mb-6'>Login</h1>
            <SignUpFrom
               isLogin
               mutate={mutate}
               isError={isError}
               error={error}
               isLoading={isLoading}
            />
         </div>
      </div>
   );
};

export default Login;
