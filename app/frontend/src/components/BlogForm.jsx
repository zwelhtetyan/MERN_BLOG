import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import TagSuggestion from './TagSuggestion';

//styles
const focusOutlineStyle =
   'outline-none outline-1 outline-offset-0 focus:outline-primary';

const BlogForm = ({
   blog,
   buttonText,
   submitHandler,
   loading,
   isError,
   error,
}) => {
   //states
   const [selectedTags, setSelectedTags] = useState(blog?.tags || []);
   const [formError, setFormError] = useState({
      message: '',
      emptyField: [],
   });

   //ref
   const titleRef = useRef(null);
   const bodyRef = useRef(null);

   const handleSubmit = () => {
      const title = titleRef.current.value;
      const tags = selectedTags;
      const body = bodyRef.current.value;

      const newBlog = { title, tags, body };

      // if blog prop has value , It is pretty sure that we have to perform updating process instead of posting

      submitHandler(newBlog);
   };

   // handle error
   useEffect(() => {
      if (isError && error.response?.status === 400) {
         console.log(error.response.data);

         setFormError({
            message: error.response.data.error,
            emptyField: error.response.data.emptyField || [],
         });
      } else if (isError) {
         throw error;
      }
   }, [error, isError]);

   return (
      <form
         className='w-full mt-5 relative'
         onSubmit={(e) => e.preventDefault()}
      >
         <input
            ref={titleRef}
            type='text'
            name='title'
            className={`bg-cardBg w-full h-10 rounded-md py-2 px-4 ${focusOutlineStyle} mb-3 ${
               formError.emptyField.includes('title') &&
               'outline-red-400 dark:outline-red-500'
            }`}
            placeholder='Title'
            defaultValue={blog?.title}
         />

         {selectedTags.length > 0 && (
            <small className='text-sm mb-1 text-gray-500 dark:text-gray-400 block'>
               double click to delete tag 🤗
            </small>
         )}

         <TagSuggestion
            focusOutlineStyle={focusOutlineStyle}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            formError={formError}
         />

         <textarea
            ref={bodyRef}
            type='text'
            name='author'
            className={`bg-cardBg w-full h-56 rounded-md py-3 px-4 ${focusOutlineStyle} ${
               formError.emptyField.includes('body') &&
               'outline-red-400 dark:outline-red-500'
            }`}
            placeholder='Write your content here...'
            defaultValue={blog?.body}
         />

         {formError.message && (
            <div className='py-3 px-6 border border-red-400 bg-red-200 dark:bg-red-400 dark:border-red-700 dark:text-black rounded-md mt-3'>
               {formError.message}
            </div>
         )}

         <button
            type='button'
            onClick={handleSubmit}
            className='bg-primary px-5 py-2 rounded-md block mx-auto mt-3 text-white dark:text-black'
         >
            {loading || buttonText}
         </button>
      </form>
   );
};

export default BlogForm;
