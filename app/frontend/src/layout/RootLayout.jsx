import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import useTheme from '../theme';
import ScrollTop from '../components/ScrollTop';

const RootLayout = () => {
   const { theme, themeToggler } = useTheme();
   const { pathname } = useLocation();

   const padding = pathname.includes('blogs')
      ? 'md:py-6 md:px-4'
      : 'py-3 xs:py-6 px-3 xs:px-4';

   return (
      <div
         className={`min-h-screen bg-mainBg text-textColor flex flex-col  ${theme}`}
      >
         <Header theme={theme} themeToggler={themeToggler} />

         <main className={` ${padding} mb-12 w-full max-w-7xl mx-auto`}>
            <Outlet />
         </main>

         <Footer />

         {/* scroll top ---- reset react router default behavior */}
         <ScrollTop />
      </div>
   );
};

export default RootLayout;
