import { formatDistanceToNow } from 'date-fns';
import z from '../assets/z.jpeg';
import { useNavigate } from 'react-router-dom';
import placeholderImg from '../assets/placeholderImg.png';

const Tag = ({ tagName }) => {
   const navigate = useNavigate();

   const handleClickTag = (e, tagName) => {
      e.stopPropagation();
      navigate(`/blogs/tags/${tagName}`);
   };

   return (
      <div
         onClick={(e) => handleClickTag(e, tagName)}
         className='lowercase px-2 py-[3px] rounded-md bg-tagBg border-[1.5px] border-transparent hover:border-primary text-sm'
      >
         {tagName}
      </div>
   );
};

const BlogCard = ({ tags, title, body, author, coverImg, createdAt, _id }) => {
   const navigate = useNavigate();

   return (
      <div
         onClick={() => navigate(`/blogs/${_id}`)}
         className='bg-cardBg rounded-md overflow-hidden shadow-sm hover:shadow-md cursor-pointer'
      >
         {/* {coverImg && ( */}
         <div>
            <img
               src={
                  coverImg
                     ? `http://localhost:3000/images/${coverImg}`
                     : placeholderImg
               }
               alt='cover_img'
               className='h-52 w-full object-cover'
            />
         </div>

         {/* )} */}

         <div className='p-4'>
            <div className='flex gap-2 mb-3'>
               {tags.map((tag) => (
                  <Tag tagName={tag} key={tag} />
               ))}
            </div>
            <h2 className='font-bold text-xl lineClamp-2 mb-2'>{title}</h2>
            <p className='lineClamp-2'>{body}</p>

            <div className='mt-3 flex gap-2 items-center'>
               <img
                  src={z}
                  alt='author_profile'
                  className='w-9 h-9 rounded-full'
               />
               <div className='leading-3'>
                  <h5 className='text-sm font-medium'>{author}</h5>
                  <time className='text-xs'>
                     {formatDistanceToNow(new Date(createdAt), {
                        addSuffix: true,
                     })}
                  </time>
               </div>
            </div>
         </div>
      </div>
   );
};

export default BlogCard;
