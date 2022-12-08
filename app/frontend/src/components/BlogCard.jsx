import { formatDistanceToNow } from 'date-fns';
import cover from '../assets/cover.jpg';
import z from '../assets/z.jpeg';

const Tag = ({ tagName }) => {
   return (
      <div className='px-2 py-[3px] rounded-md bg-tagBg border-[1.5px] border-transparent hover:border-primary text-sm'>
         {tagName}
      </div>
   );
};

const BlogCard = ({ tags, title, body, createdAt }) => {
   return (
      <article className='bg-cardBg rounded-md overflow-hidden shadow-sm hover:shadow-md cursor-pointer'>
         <img src={cover} alt='cover_img' />
         <div className='p-4'>
            <div className='flex gap-2 mb-3'>
               {tags.map((tag) => (
                  <Tag tagName={tag} key={tag} />
               ))}
            </div>
            <h2 className='font-bold text-xl lineClamp-2'>{title}</h2>
            <p className='lineClamp-2'>{body}</p>

            <div className='mt-3 flex gap-2 items-center'>
               <img
                  src={z}
                  alt='author_profile'
                  className='w-9 h-9 rounded-full'
               />
               <div className='leading-3'>
                  <h5 className='text-sm'>Zwel</h5>
                  <time className='text-xs'>
                     {formatDistanceToNow(new Date(createdAt), {
                        addSuffix: true,
                     })}
                  </time>
               </div>
            </div>
         </div>
      </article>
   );
};

export default BlogCard;
