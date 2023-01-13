import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../api';
import BlogForm from '../components/BlogForm';

const Create = () => {
   // react query
   const queryClient = useQueryClient();

   // router
   const navigate = useNavigate();

   //post request
   const {
      mutate,
      isLoading: isCreating,
      isError,
      error,
   } = useMutation((newBlog) => createBlog(newBlog), {
      onSuccess: () => {
         queryClient.invalidateQueries('getAllBlogs');
         navigate('/');
      },
   });

   const submitHandler = (newBlog) => mutate(newBlog);

   return (
      <div className='max-w-xl w-full mx-auto'>
         <BlogForm
            submitHandler={submitHandler}
            buttonText={'Create'}
            loading={isCreating ? 'Creating...' : null}
            isError={isError}
            error={error}
         />
      </div>
   );
};

export default Create;
