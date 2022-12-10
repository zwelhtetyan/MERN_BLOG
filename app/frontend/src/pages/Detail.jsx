import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import cover from '../assets/cover.jpg';
import z from '../assets/z.jpeg';

const Tag = ({ tagName }) => {
   return (
      <div className='lowercase px-2 py-[3px] rounded-md bg-tagBg border-[1.5px] border-transparent hover:border-primary text-sm'>
         {tagName}
      </div>
   );
};

const Detail = () => {
   const { id } = useParams();

   const getBlog = () =>
      axios.get(`http://localhost:3000/blogs/${id}`).then(({ data }) => data);

   const { data: blog, isLoading } = useQuery(['getBlog', id], getBlog);

   if (isLoading) return 'loading...';

   return (
      <div className='md:max-w-2xl mx-auto md:rounded-md overflow-hidden bg-cardBg'>
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
               <div className='cursor-pointer border bg-tagBg border-transparent hover:border-primary flex items-center justify-center rounded-md'>
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
