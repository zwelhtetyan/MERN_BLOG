import { useState, useEffect, useRef } from 'react';

const useClickOutside = () => {
   const ref = useRef(null);
   const [isOutside, setIsOutside] = useState(false);

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (ref.current && !ref.current.contains(e.target)) {
            setIsOutside(true);
         } else {
            setIsOutside(false);
         }
      };

      document.addEventListener('click', handleClickOutside, true);

      return () => document.removeEventListener('click', handleClickOutside);
   }, []);

   return { ref, isOutside };
};

export default useClickOutside;
