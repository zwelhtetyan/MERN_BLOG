import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getBlogByTag } from '../api';
import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader';

const BlogsByTag = () => {
   const { tagName } = useParams();

   const {
      data: blogs,
      isLoading,
      isError,
      error,
   } = useQuery(['getBlogByTag', tagName], () => getBlogByTag(tagName));

   if (isLoading) return <Loader />;

   if (isError) throw error;

   return (
      <div>
         <h2 className='text-center text-lg mb-5'>
            All articles related with{' '}
            <span className='font-semibold text-primary'>"{tagName}"</span>
         </h2>
         <div className='grid xs:grid-cols-autoFit300 gap-4'>
            {blogs.map((blog) => (
               <BlogCard {...blog} key={blog._id} />
            ))}
         </div>
      </div>
   );
};

export default BlogsByTag;
