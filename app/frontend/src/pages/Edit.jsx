import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlog, updateBlog } from '../api';
import BlogForm from '../components/BlogForm';

const Edit = () => {
   //react router dom
   const { id } = useParams();
   const navigate = useNavigate();

   // react query
   const queryClient = useQueryClient();

   // get single blog
   const { data: blog, isLoading } = useQuery(['getBlog', id], () =>
      getBlog(id)
   );

   //update request
   const { mutate, isLoading: isUpdating } = useMutation(
      (updatedBlog) => updateBlog(id, updatedBlog),
      {
         onSuccess: () => {
            queryClient.invalidateQueries(['getBlog', id]);
            navigate(-1);
         },
      }
   );

   const submitHandler = (updatedBlog) => mutate(updatedBlog);

   if (isLoading) return 'loading...';

   return (
      <div className='max-w-xl w-full mx-auto'>
         <BlogForm
            submitHandler={submitHandler}
            buttonText='Update'
            blog={blog}
            loading={isUpdating ? 'Updating...' : null}
         />
      </div>
   );
};

export default Edit;
