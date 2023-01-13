import CircleLoader from 'react-spinners/CircleLoader';

const Loader = () => {
   return (
      <div className='flex flex-col items-center justify-center'>
         <div className='mt-[10vh]'>
            <CircleLoader
               color='#4bb790'
               loading={true}
               aria-label='Loading Spinner'
               cssOverride={{ margin: '0 auto' }}
            />
            <p className='mt-3 tracking-wide'>Loading...</p>
         </div>
      </div>
   );
};

export default Loader;
