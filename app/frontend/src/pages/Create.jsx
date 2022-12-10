import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TagSuggestion from '../components/TagSuggestion';

//styles
const focusOutlineStyle =
   'outline-none outline-1 outline-offset-0 focus:outline-primary';

const Create = () => {
   // states
   const [selectedTags, setSelectedTags] = useState([]);

   // refs
   const titleRef = useRef(null);
   const bodyRef = useRef(null);

   // router
   const navigate = useNavigate();

   //post request
   const { mutate, isLoading, isSuccess } = useMutation((newBlog) =>
      axios.post('http://localhost:3000/blogs', newBlog)
   );

   const handleSubmit = () => {
      const title = titleRef.current.value;
      const tags = selectedTags;
      const body = bodyRef.current.value;

      const newBlog = { title, tags, body };
      mutate(newBlog);
      // console.log(newBlog);
   };

   if (isLoading) return 'loading...';

   if (isSuccess) {
      navigate('/');
   }

   return (
      <div className='max-w-xl w-full mx-auto'>
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
            />

            <button
               type='button'
               onClick={handleSubmit}
               className='bg-primary px-5 py-2 rounded-md block mx-auto mt-3 text-white dark:text-zinc-600'
            >
               Create
            </button>
         </form>
      </div>
   );
};

export default Create;
