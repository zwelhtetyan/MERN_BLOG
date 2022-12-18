import { formatDistanceToNow } from 'date-fns';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import z from '../assets/z.jpeg';

import { deleteBlog, getBlog } from '../api';
import Loader from '../components/Loader';
import Option from '../components/Options';

const Tag = ({ tagName }) => {
   const navigate = useNavigate();

   const handleClickTag = () => {
      navigate(`/blogs/tags/${tagName}`);
   };

   return (
      <div
         className='lowercase px-2 py-[3px] rounded-md bg-tagBg border-[1.5px] border-transparent hover:border-primary text-sm cursor-pointer'
         onClick={handleClickTag}
      >
         {tagName}
      </div>
   );
};

const Detail = () => {
   // react query
   const queryClient = useQueryClient();

   // react router
   const { id } = useParams();
   const navigate = useNavigate();

   // get single blog
   const {
      data: blog,
      isLoading,
      isError,
      error,
   } = useQuery(['getBlog', id], () => getBlog(id));

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

   if (isLoading) return <Loader />;

   if (isError) throw error;

   const handleDeleteBlog = () => mutate();

   return (
      <div className='md:max-w-2xl mx-auto md:rounded-md overflow-hidden bg-cardBg shadow-sm'>
         {blog.coverImg && (
            <img
               src={`http://localhost:3000/images/${blog.coverImg}`}
               alt='cover'
               className='w-full h-56 xs:h-64 object-cover'
            />
         )}

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

               <Option
                  id={id}
                  title={blog.title}
                  handleDeleteBlog={handleDeleteBlog}
                  isDeleting={isDeleting}
               />
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
};

export default Detail;
