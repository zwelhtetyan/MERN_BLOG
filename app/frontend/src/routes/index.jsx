import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import { Home, About, Create } from '../pages';
import Detail from '../pages/Detail';
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
         { path: 'blogs/:id', element: <Detail /> },
      ],
      errorElement: <Error />,
   },
   { path: '*', element: <PageNotFound /> },
]);
