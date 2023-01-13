import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import useTheme from './theme';
import useRouter from './routes';

const App = () => {
   // set theme
   useTheme();

   // router
   const router = useRouter();

   // set window focus to false
   const queryClient = new QueryClient({
      defaultOptions: {
         queries: {
            refetchOnWindowFocus: false,
         },
      },
   });

   return (
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />
      </QueryClientProvider>
   );
};

export default App;
