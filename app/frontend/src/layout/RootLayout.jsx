import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import useTheme from '../theme';

const RootLayout = () => {
   const { theme, themeToggler } = useTheme();

   return (
      <div
         className={`min-h-screen bg-mainBg text-textColor flex flex-col  ${theme}`}
      >
         <Header theme={theme} themeToggler={themeToggler} />

         <main className='pt-6 pb-12 px-3 xs:px-4 w-full max-w-7xl mx-auto'>
            <Outlet />
         </main>

         <Footer />
      </div>
   );
};

export default RootLayout;
