import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import cover from '../assets/cover.jpg';
import z from '../assets/z.jpeg';
import Options from '../components/Options';
import ReactDOM from 'react-dom';
import { deleteBlog, getBlog } from '../api';

const Modal = ({ blog, setShowModal, handleDeleteBlog, isDeleting }) => (
   <div className='fixed w-full h-screen top-0 left-0 z-20 flex items-center justify-center bg-[#000000e0]'>
      <div className='bg-white dark:bg-cardBg max-w-xl m-2 p-4 rounded-md w-full shadow-md'>
         <h1 className='font-bold text-xl mb-2'>{blog.title}</h1>

         <p>Are you sure you want to delete this article?</p>

         <div className='mt-4 flex justify-end'>
            <button
               onClick={handleDeleteBlog}
               className='p-2 px-4 bg-red-500 text-white hover:bg-red-600 duration-75 rounded-md'
            >
               {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button
               onClick={() => setShowModal(false)}
               className='p-2 px-4 bg-[#dcdbdb] dark:bg-tagBg hover:bg-[#d3cccc] dark:hover:bg-[#424242] duration-75 rounded-md ml-2'
            >
               Cancel
            </button>
         </div>
      </div>
   </div>
);

const Tag = ({ tagName }) => {
   return (
      <div className='lowercase px-2 py-[3px] rounded-md bg-tagBg border-[1.5px] border-transparent hover:border-primary text-sm'>
         {tagName}
      </div>
   );
};

const Content = ({ blog, setShowModal, id }) => (
   <div className='md:max-w-2xl mx-auto md:rounded-md overflow-hidden bg-cardBg shadow-sm'>
      <img
         src={cover}
         alt='cover'
         className='w-full h-52 xs:h-64 object-cover'
      />

      <div className='p-3 pb-5'>
         <div className='flex justify-between items-center'>
            {/* author */}
            <div className='flex gap-2 items-center'>
               <img
                  src={z}
                  alt='author_profile'
                  className='w-11 h-11 rounded-full'
               />

               <div className='flex flex-col justify-center'>
                  <h5 className='font-bold'>Zwel</h5>
                  <time className='text-xs'>
                     {formatDistanceToNow(new Date(blog.createdAt), {
                        addSuffix: true,
                     })}
                  </time>
               </div>
            </div>

            {/* option */}
            <Options setShowModal={setShowModal} id={id} />
         </div>

         <h1 className='mt-3 font-bold text-2xl'>{blog.title}</h1>

         <div className='flex gap-2 mt-3'>
            {blog.tags.map((tagName) => (
               <Tag tagName={tagName} key={tagName} />
            ))}
         </div>

         <p className='mt-3'>{blog.body}</p>
      </div>
   </div>
);

const Detail = () => {
   //states
   const [showModal, setShowModal] = useState(false);

   // react query
   const queryClient = useQueryClient();

   // react router
   const { id } = useParams();
   const navigate = useNavigate();

   // get single blog
   const { data: blog, isLoading } = useQuery(['getBlog', id], () =>
      getBlog(id)
   );

   // delete single blog
   const { mutate, isLoading: isDeleting } = useMutation(
      ['deleteBlog', id],
      () => deleteBlog(id),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('getAllBlogs');
            navigate('/');
         },
      }
   );

   if (isLoading) return 'loading...';

   const handleDeleteBlog = () => mutate();

   return (
      <>
         <Content blog={blog} setShowModal={setShowModal} id={id} />

         {showModal &&
            ReactDOM.createPortal(
               <Modal
                  blog={blog}
                  setShowModal={setShowModal}
                  handleDeleteBlog={handleDeleteBlog}
                  isDeleting={isDeleting}
               />,
               document.getElementById('modal')
            )}
      </>
   );
};

export default Detail;
