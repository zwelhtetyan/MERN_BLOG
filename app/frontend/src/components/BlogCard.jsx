import cover from '../assets/cover.jpg';
import z from '../assets/z.jpeg';

const Tag = ({ tagName, color }) => (
   //    <div className={`text-[${color}]`}>{tagName}</div>
   <div className='bg-blue-600 px-2 rounded-md'>nature</div>
);

const BlogCard = () => {
   return (
      <article className='bg-cardBg rounded-md overflow-hidden shadow-sm hover:shadow-md cursor-pointer'>
         <img src={cover} alt='cover_img' />
         <div className='p-4'>
            <div className='flex gap-2 mb-3'>
               {[1, 2, 3].map((n) => (
                  <Tag key={n} />
               ))}
            </div>
            <h2 className='font-bold text-xl lineClamp-2'>
               This is my very first blog.
            </h2>
            <p className='lineClamp-2'>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit.
               Delectus officiis numquam placeat similique impedit tempore
               aperiam nostrum asperiores facere, debitis atque consequatur,
               reiciendis provident aliquam maiores quasi totam exercitationem!
            </p>

            <div className='mt-3 flex gap-2 items-center'>
               <img
                  src={z}
                  alt='author_profile'
                  className='w-9 h-9 rounded-full'
               />
               <div className='leading-3'>
                  <h5 className='text-sm'>Zwel Htet Yan</h5>
                  <time className='text-xs'>3h ago</time>
               </div>
            </div>
         </div>
      </article>
   );
};

export default BlogCard;
