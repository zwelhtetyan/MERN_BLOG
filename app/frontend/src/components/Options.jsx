import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

export default function Option({ id, title, handleDeleteBlog, isDeleting }) {
   const navigate = useNavigate();

   const [isOpen, setIsOpen] = useState(false);

   function closeModal() {
      setIsOpen(false);
   }

   function openModal() {
      setIsOpen(true);
   }

   const onDelete = () => {
      handleDeleteBlog();
      closeModal();
   };

   return (
      <Menu as='div' className='relative inline-block text-left'>
         <div>
            <Menu.Button className='inline-flex w-full justify-center rounded-md p-[1px] border border-transparent hover:border-primary text-sm bg-tagBg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='27'
                  height='27'
                  viewBox='0 0 24 24'
                  className='fill-textColor'
               >
                  <path d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'></path>
               </svg>
            </Menu.Button>
         </div>
         <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
         >
            <Menu.Items className='absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-tagBg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
               <div className='px-1 py-1 '>
                  {/* edit */}
                  <Menu.Item>
                     {({ active }) => (
                        <button
                           onClick={() => navigate(`/blogs/${id}/edit`)}
                           className={`${
                              active ? 'bg-mainBg' : ''
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           {active ? (
                              <EditActiveIcon
                                 className='mr-2 h-5 w-5'
                                 aria-hidden='true'
                              />
                           ) : (
                              <EditInactiveIcon
                                 className='mr-2 h-5 w-5'
                                 aria-hidden='true'
                              />
                           )}
                           Edit
                        </button>
                     )}
                  </Menu.Item>
                  {/* delete */}
                  <Menu.Item>
                     {({ active }) => (
                        <button
                           onClick={openModal}
                           className={`${
                              active ? 'bg-mainBg' : ''
                           } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                           {active ? (
                              <DeleteActiveIcon
                                 className='mr-2 h-5 w-5 text-violet-400'
                                 aria-hidden='true'
                              />
                           ) : (
                              <DeleteInactiveIcon
                                 className='mr-2 h-5 w-5 text-violet-400'
                                 aria-hidden='true'
                              />
                           )}
                           Delete
                        </button>
                     )}
                  </Menu.Item>
               </div>
            </Menu.Items>
         </Transition>

         {/* modal */}
         <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
               <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
               >
                  <div className='fixed inset-0 bg-black bg-opacity-25' />
               </Transition.Child>

               <div className='fixed inset-0 overflow-y-auto'>
                  <div className='flex min-h-full items-center justify-center p-4 text-center'>
                     <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                     >
                        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-cardBg p-6 text-left align-middle shadow-xl transition-all'>
                           <Dialog.Title
                              as='h3'
                              className='text-xl font-medium leading-6'
                           >
                              {title}
                           </Dialog.Title>
                           <div className='mt-2'>
                              <p className='text-sm'>
                                 Are you sure you want to delete this article?
                              </p>
                           </div>

                           <div className='mt-4'>
                              <button
                                 type='button'
                                 className='mr-3 inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 text-white py-2 text-sm font-medium hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                 onClick={onDelete}
                              >
                                 {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                              </button>

                              <button
                                 type='button'
                                 className='inline-flex justify-center rounded-md border border-transparent  bg-tagBg hover:bg-[#d3cccc] dark:hover:bg-[#424242] px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                 onClick={closeModal}
                              >
                                 Cancel
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </Menu>
   );
}

function EditInactiveIcon(props) {
   return (
      <svg
         {...props}
         viewBox='0 0 20 20'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'
      >
         <path
            d='M4 13V16H7L16 7L13 4L4 13Z'
            strokeWidth='2'
            className='fill-white stroke-primary'
         />
      </svg>
   );
}

function EditActiveIcon(props) {
   return (
      <svg
         {...props}
         viewBox='0 0 20 20'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'
      >
         <path
            d='M4 13V16H7L16 7L13 4L4 13Z'
            strokeWidth='2'
            className='fill-primary stroke-primary'
         />
      </svg>
   );
}

function DeleteInactiveIcon(props) {
   return (
      <svg
         {...props}
         viewBox='0 0 20 20'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'
      >
         <rect
            x='5'
            y='6'
            width='10'
            height='10'
            strokeWidth='2'
            className='fill-white stroke-primary'
         />
         <path d='M3 6H17' strokeWidth='2' className='stroke-primary' />
         <path d='M8 6V4H12V6' strokeWidth='2' className='stroke-primary' />
      </svg>
   );
}

function DeleteActiveIcon(props) {
   return (
      <svg
         {...props}
         viewBox='0 0 20 20'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'
      >
         <rect
            x='5'
            y='6'
            width='10'
            height='10'
            strokeWidth='2'
            className='fill-primary stroke-primary'
         />
         <path d='M3 6H17' strokeWidth='2' className='stroke-primary' />
         <path d='M8 6V4H12V6' strokeWidth='2' className='stroke-primary' />
      </svg>
   );
}
