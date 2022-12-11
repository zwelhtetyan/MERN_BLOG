import React, { useState } from 'react';
import { useRef } from 'react';
import TagSuggestion from './TagSuggestion';

//styles
const focusOutlineStyle =
   'outline-none outline-1 outline-offset-0 focus:outline-primary';

const BlogForm = ({ blog, buttonText, submitHandler, loading }) => {
   //states
   const [selectedTags, setSelectedTags] = useState(blog?.tags || []);

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

   return (
      <form
         className='w-full mt-5 relative'
         onSubmit={(e) => e.preventDefault()}
      >
         <input
            ref={titleRef}
            type='text'
            name='title'
            className={`bg-cardBg w-full h-10 rounded-md py-2 px-4 ${focusOutlineStyle} mb-3`}
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
         />

         <textarea
            ref={bodyRef}
            type='text'
            name='author'
            className={`bg-cardBg w-full h-24 rounded-md py-2 px-4 ${focusOutlineStyle}`}
            placeholder='Write your content here...'
            defaultValue={blog?.body}
         />

         <button
            type='button'
            onClick={handleSubmit}
            className='bg-primary px-5 py-2 rounded-md block mx-auto mt-3 text-white dark:text-zinc-600'
         >
            {loading || buttonText}
         </button>
      </form>
   );
};

export default BlogForm;
