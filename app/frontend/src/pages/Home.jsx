import { useQuery } from 'react-query';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const Home = () => {
   const { data: blogs, isLoading } = useQuery('getAllBlogs', () =>
      axios.get('http://localhost:3000/blogs').then(({ data }) => data)
   );

   if (isLoading) return 'loading...';

   console.log(blogs);

   return (
      <div className='grid xs:grid-cols-autoFit300 gap-4 xs:gap-6'>
         {blogs.map((blog) => (
            <BlogCard {...blog} key={blog._id} />
         ))}
      </div>
   );
};

export default Home;
