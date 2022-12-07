import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import { Home, About, Create } from '../pages';
import Error from '../pages/Error';
import PageNotFound from '../pages/PageNotFound';

export const router = createBrowserRouter([
   {
      path: '/',
      element: <RootLayout />,
      children: [
         { index: true, element: <Home /> },
         { path: 'about', element: <About /> },
         { path: 'create', element: <Create /> },
      ],
      errorElement: <Error />,
   },
   { path: '*', element: <PageNotFound /> },
]);
