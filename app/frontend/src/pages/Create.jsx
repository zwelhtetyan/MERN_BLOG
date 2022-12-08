import { useEffect } from 'react';
import { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import tagSuggestions from '../tagSuggestions.json';

const focusOutlineStyle =
   'outline-none outline-1 outline-offset-0 focus:outline-primary';

// Sgt => Suggestion;

const SGT = ({ tagName, desc, onClick }) => (
   <div
      className='bg-cardBg hover:bg-tagBg py-2 px-3 cursor-pointer'
      onClick={() => onClick(tagName)}
   >
      <h4 className='text-lg font-bold '>{tagName}</h4>
      <p className='leading-5 text-sm'>{desc}</p>
   </div>
);

const Create = () => {
   // states
   const [suggestions, setSuggestions] = useState(tagSuggestions);
   const [availableTags, setAvailableTags] = useState(tagSuggestions);
   const [showSgtBox, setShowSgtBox] = useState(false);
   const [sgtBoxTopPx, setSgtBoxTopPx] = useState(92);
   const [selectedTags, setSelectedTags] = useState([]);

   // refs
   const tagRef = useRef(null);

   // hooks
   const { isOutside: outsideOfSgtInput, ref: sgtInputRef } = useClickOutside();
   const { isOutside: outsideOfSgtBox, ref: sgtBoxRef } = useClickOutside();

   const handleTagSgt = (e) => {
      const searchTerm = e.target.value.trim();

      const filteredTags = searchTerm.length
         ? suggestions.filter((t) =>
              t.tagName.toLowerCase().includes(searchTerm.toLowerCase())
           )
         : suggestions;

      setAvailableTags(filteredTags);
   };

   const handleSelectTag = (tagName) => {
      setSelectedTags((prev) => [...prev, tagName]);

      // remove selected tags from suggestions
      setAvailableTags((prev) => prev.filter((t) => t.tagName !== tagName));
      setSuggestions((prev) => prev.filter((t) => t.tagName !== tagName));

      handleClickSgtInput(); // refocus the next available input
      tagRef.current.value = '';
   };

   const handleSelectCustomTag = () => {
      const customTag = tagRef.current.value.trim();

      const isDuplicateTag = selectedTags.filter(
         (tag) => tag.toLowerCase() === customTag.toLowerCase()
      );

      if (customTag && !isDuplicateTag.length) {
         setSelectedTags((prev) => [...prev, customTag]);
         handleClickSgtInput(); // refocus the next available input
         tagRef.current.value = '';
      }
   };

   const handleClickSgtInput = () => {
      tagRef.current?.focus();
      setShowSgtBox(true);
   };

   const handleHideSgtBox = () => setShowSgtBox(false);

   //handle click outside
   useEffect(() => {
      if (outsideOfSgtInput && outsideOfSgtBox) {
         handleHideSgtBox();
         handleSelectCustomTag();
      }
   }, [outsideOfSgtInput, outsideOfSgtBox]);

   // dynamic suggestion box position
   useEffect(() => {
      const sgtInput = document.getElementById('sgtInput');
      const topPx = 52 + sgtInput.offsetHeight;
      setSgtBoxTopPx(topPx);
   }, [selectedTags.length]);

   return (
      <div className='max-w-xl w-full mx-auto'>
         <form action='' className='w-full mt-5 relative'>
            <input
               type='text'
               name='title'
               className={`bg-cardBg w-full h-10 rounded-md py-2 px-4 ${focusOutlineStyle} mb-3`}
               placeholder='Title'
            />

            <ul
               id='sgtInput'
               className={`w-full mb-3 ${
                  showSgtBox ? 'rounded-t-md' : 'rounded-md'
               } bg-cardBg p-1 px-2 flex gap-2 cursor-text flex-wrap`}
               onClick={handleClickSgtInput}
               ref={sgtInputRef}
            >
               {selectedTags.map((tagName) => (
                  <li
                     key={tagName}
                     className='h-8 flex items-center text-center bg-tagBg p-2 rounded-md cursor-default'
                     onClick={(e) => e.stopPropagation()}
                  >
                     <p>{tagName}</p>
                  </li>
               ))}

               {selectedTags.length < 3 && (
                  <li className='h-8 w-40'>
                     <input
                        ref={tagRef}
                        onChange={handleTagSgt}
                        type='text'
                        className={`bg-cardBg w-full rounded-md h-full p-2 ${focusOutlineStyle}`}
                        placeholder='Add up to 3 tags...'
                     />
                  </li>
               )}
            </ul>

            <textarea
               type='text'
               name='author'
               className={`bg-cardBg w-full h-24 rounded-md py-2 px-4 ${focusOutlineStyle}`}
               placeholder='Write your content here...'
            />

            <button className='bg-primary px-5 py-2 rounded-md block mx-auto mt-3 text-white dark:text-zinc-600'>
               Create
            </button>

            {/* suggestion box */}
            {showSgtBox && selectedTags.length < 3 && (
               <div
                  ref={sgtBoxRef}
                  id='sgtBox'
                  className={`bg-cardBg w-full max-w-xl max-h-[320px] overflow-auto rounded-b-md absolute`}
                  style={{ top: `${sgtBoxTopPx}px` }}
               >
                  {availableTags.map((tag) => (
                     <SGT
                        {...tag}
                        key={tag.tagName}
                        onClick={handleSelectTag}
                     />
                  ))}
               </div>
            )}
         </form>
      </div>
   );
};

export default Create;
