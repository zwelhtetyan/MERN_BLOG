import logo from '../assets/logo.svg';

const PageNotFound = () => {
   return (
      <div className='flex flex-col items-center mt-[10vh] m-4 text-sm md:text-base'>
         <img src={logo} alt='logo' className='w-20 xs:w-24' />
         <h2 className='text-base xs:text-lg mt-1'>
            <span className='font-bold'>404! :</span> Page not found
         </h2>
      </div>
   );
};

export default PageNotFound;
