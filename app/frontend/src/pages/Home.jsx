import { useQuery } from 'react-query';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const Home = () => {
   const { data: blogs, isLoading } = useQuery('getAllBlogs', () =>
      axios.get('http://localhost:3000/blogs').then(({ data }) => data)
   );

   console.log(blogs);

   return (
      <div className='grid xs:grid-cols-autoFit300 gap-4 xs:gap-6'>
         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <BlogCard key={n} />
         ))}
      </div>
   );
};

export default Home;
