import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import RootLayout from '../layout/RootLayout';
import { Home, About, Create } from '../pages';
import Detail from '../pages/Detail';
import Edit from '../pages/Edit';
import Error from '../pages/Error';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import Signup from '../pages/Signup';

const useRouter = () => {
   const { user } = useAuthContext();

   const router = createBrowserRouter([
      {
         path: '/',
         element: <RootLayout />,
         children: [
            { index: true, element: <Home /> },
            { path: 'about', element: <About /> },
            {
               path: 'create',
               element: user ? <Create /> : <Navigate to='/' />,
            },
            { path: 'blogs/:id', element: <Detail /> },
            { path: 'blogs/:id/edit', element: <Edit /> },
         ],
         errorElement: <Error />,
      },
      { path: '*', element: <PageNotFound /> },
      {
         path: '/login',
         element: user ? <Navigate to='/' /> : <Login />,
         errorElement: <Error />,
      },
      {
         path: '/signup',
         element: user ? <Navigate to='/' /> : <Signup />,
         errorElement: <Error />,
      },
   ]);

   return router;
};

export default useRouter;
