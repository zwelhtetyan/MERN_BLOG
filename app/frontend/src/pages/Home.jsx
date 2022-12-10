import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { useRef, useEffect, Fragment } from 'react';

const Home = () => {
   //ref
   const loaderRef = useRef(null);

   const getAllBlogs = ({ pageParam = 0 }) => {
      return axios
         .get(`http://localhost:3000/blogs?limit=10&page=${pageParam}`)
         .then(({ data }) => data);
   };

   const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
      useInfiniteQuery('getAllBlogs', getAllBlogs, {
         getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length - 1 + 1;
            return lastPage.length ? nextPage : null;
         },
      });

   useEffect(() => {
      if (isLoading) return;

      const loaderElem = loaderRef.current;

      const observer = new IntersectionObserver(
         (entries) => {
            // console.log(entries[0].isIntersecting);
            if (entries[0].isIntersecting && hasNextPage) {
               fetchNextPage();
            }
         },
         { threshold: 0.1 }
      );

      observer.observe(loaderElem);

      return () => observer.unobserve(loaderElem);
   }, [fetchNextPage, hasNextPage, isLoading]);

   if (isLoading) return 'loading...';

   return (
      <>
         <div className='grid xs:grid-cols-autoFit300 gap-4'>
            {data.pages.map((blogs) =>
               blogs.map((blog) => <BlogCard {...blog} key={blog._id} />)
            )}
         </div>

         {/* load more */}
         <div className='flex items-center justify-center pt-5' ref={loaderRef}>
            {isFetchingNextPage && (
               <>
                  <p>fetching more data for you...</p>
                  <p className='ml-2 rounded-full h-6 w-6 animate-spin border-2 border-primary border-t-transparent'></p>
               </>
            )}
         </div>
      </>
   );
};

export default Home;
