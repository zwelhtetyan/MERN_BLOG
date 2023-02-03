import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import TagSuggestion from './TagSuggestion';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

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
  const [img, setImg] = useState(null);
  const [usedCvImg, setUsedCvImg] = useState(blog?.coverImg || null);
  const [formError, setFormError] = useState({
    message: '',
    emptyField: [],
  });

  //hooks
  const {
    user: { name },
  } = useAuthContext();

  //ref
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  const handleSubmit = async () => {
    const title = titleRef.current.value;
    const tags = selectedTags;
    const body = bodyRef.current.value;

    const newBlog = { title, tags, body, coverImg: usedCvImg, author: name };

    // if blog prop has value , It is pretty sure that we have to perform updating process instead of posting

    if (img) {
      const data = new FormData();
      const imgName = Date.now() + img.name;

      data.append('imgName', imgName);
      data.append('img', img);

      newBlog.coverImg = imgName;

      try {
        await axios.post('https://bmern.onrender.com/upload', data);
      } catch (error) {
        console.log(error);
      }
    }

    submitHandler(newBlog);
  };

  const handleRemoveImg = () => (usedCvImg ? setUsedCvImg(null) : setImg(null));

  // handle error
  useEffect(() => {
    if (isError && error.response?.status === 400) {
      setFormError({
        message: error.response.data.error,
        emptyField: error.response.data.emptyField || [],
      });
    } else if (isError) {
      throw error;
    }
  }, [error, isError]);

  return (
    <form className='w-full mt-3 relative' onSubmit={(e) => e.preventDefault()}>
      <div className='mb-3 flex items-end flex-wrap'>
        {img && (
          <img
            src={URL.createObjectURL(img)}
            alt='coverImg'
            className='h-32 rounded-md mr-4'
          />
        )}

        {usedCvImg && !img && (
          <img
            src={`https://bmern.onrender.com/images/${usedCvImg}`}
            alt='coverImg'
            className='h-32 rounded-md mr-4'
          />
        )}

        <div className='flex flex-wrap pt-2'>
          <label
            htmlFor='cvImg'
            className='w-32 bg-cardBg p-2 rounded-md flex justify-center shadow hover:bg-tagBg duration-200 cursor-pointer'
          >
            <p className='mr-2'>Add photo</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-upload'
            >
              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
              <polyline points='17 8 12 3 7 8'></polyline>
              <line x1='12' y1='3' x2='12' y2='15'></line>
            </svg>
          </label>
          <input
            type='file'
            name='coverImage'
            id='cvImg'
            className='hidden'
            onChange={(e) => setImg(e.target.files[0])}
          />

          {(img || usedCvImg) && (
            <button
              type='button'
              onClick={handleRemoveImg}
              className='bg-cardBg p-2 rounded-md ml-2 hover:bg-tagBg duration-200'
            >
              Remove photo
            </button>
          )}
        </div>
      </div>

      <input
        ref={titleRef}
        type='text'
        name='title'
        className={`bg-cardBg w-full h-10 rounded-md py-2 px-4 focus-outline mb-3 shadow ${
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
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        formError={formError}
        hasCvImg={img}
      />

      <textarea
        ref={bodyRef}
        type='text'
        name='author'
        className={`bg-cardBg w-full h-56 rounded-md py-3 px-4 focus-outline shadow ${
          formError.emptyField.includes('body') &&
          'outline-red-400 dark:outline-red-500'
        }`}
        placeholder='Write your content here...'
        defaultValue={blog?.body}
      />

      {formError.message && (
        <div className='py-3 text-sm px-6 border border-red-400 bg-red-200 dark:bg-red-400 dark:border-red-700 dark:text-black rounded-md mt-3'>
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
