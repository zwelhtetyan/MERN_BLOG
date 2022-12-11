import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';

const Options = ({ setShowModal, id }) => {
   // states
   const [menuOpen, setMenuOpen] = useState(false);

   // react router dom
   const navigate = useNavigate();

   //ref
   const { ref: menuRef, isOutside: menuOutside } = useClickOutside();
   const { ref: menuBtnRef, isOutside: menuBtnOutside } = useClickOutside();

   const toggleMenuOpen = () => setMenuOpen((prev) => !prev);

   useEffect(() => {
      if (menuOutside && menuBtnOutside) {
         setMenuOpen(false);
      }
   }, [menuBtnOutside, menuOutside]);

   const handleNavigate = () => navigate(`/blogs/${id}/edit`);

   return (
      <div className='relative'>
         <div
            ref={menuBtnRef}
            onClick={toggleMenuOpen}
            className='cursor-pointer border bg-tagBg border-transparent hover:border-primary flex items-center justify-center rounded-md'
         >
            <svg
               xmlns='http://www.w3.org/2000/svg'
               width='27'
               height='27'
               viewBox='0 0 24 24'
               className='fill-textColor'
            >
               <path d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'></path>
            </svg>
         </div>

         {/* menu */}
         {menuOpen && (
            <ul
               ref={menuRef}
               className='absolute cursor-pointer top-[30px] left-[-68px] bg-mainBg rounded-md overflow-hidden'
            >
               <li
                  className='py-2 px-6 hover:bg-tagBg'
                  onClick={handleNavigate}
               >
                  Edit
               </li>
               <li
                  className='py-2 px-6 hover:bg-tagBg'
                  onClick={() => setShowModal(true)}
               >
                  Delete
               </li>
            </ul>
         )}
      </div>
   );
};

export default Options;
