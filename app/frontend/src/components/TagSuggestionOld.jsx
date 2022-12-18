import { useRef, useState, useEffect, useCallback } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import tagSuggestions from '../tagSuggestions.json';

//Note: Sgt => Suggestion;

const SGT = ({ tagName, desc, onClick, idx, currentIdx, keyCode }) => {
   useEffect(() => {
      if (currentIdx >= 0 && (keyCode === 40 || keyCode === 38)) {
         const currentElem = document.getElementById(`tag-${currentIdx}`);

         const observer = new IntersectionObserver(
            (entries) => {
               entries.forEach((entry) => {
                  if (!entry.isIntersecting) {
                     const option = keyCode === 40 ? false : true;
                     currentElem.scrollIntoView(option);
                  }
               });
            },
            { threshold: 0.5 }
         );

         observer.observe(currentElem);

         return () => observer.unobserve(currentElem);
      }
   }, [currentIdx, keyCode]);

   return (
      <div
         id={`tag-${idx}`}
         className={`${
            idx === currentIdx ? 'bg-tagBg' : 'bg-cardBg'
         } hover:bg-tagBg py-2 px-3 cursor-pointer`}
         onClick={() => onClick(tagName.toLowerCase())}
      >
         <h4 className='text-lg font-bold capitalize'>{tagName}</h4>
         <p className='leading-5 text-sm'>{desc}</p>
      </div>
   );
};

const TagSuggestion = ({
   selectedTags,
   setSelectedTags,
   formError,
   hasCvImg,
}) => {
   // states
   const [suggestions, setSuggestions] = useState(tagSuggestions);
   const [availableTags, setAvailableTags] = useState(tagSuggestions);
   const [showSgtBox, setShowSgtBox] = useState(false);
   const [sgtBoxTopPx, setSgtBoxTopPx] = useState(null);
   const [currentIdx, setCurrentIdx] = useState(-1);
   const [keyCode, setKeyCode] = useState(null);

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

   const handleSelectTag = useCallback(
      (tagName) => {
         setSelectedTags((prev) => [...prev, tagName]);

         handleClickSgtInput(); // refocus the next available input
         tagRef.current.value = '';
      },
      [setSelectedTags]
   );

   const handleSelectCustomTag = useCallback(() => {
      const customTag = tagRef.current.value.trim();

      const duplicateTag = selectedTags.filter(
         (tag) => tag.toLowerCase() === customTag.toLowerCase()
      );

      if (customTag && !duplicateTag.length) {
         setSelectedTags((prev) => [...prev, customTag]);
         handleClickSgtInput(); // refocus the next available input
         tagRef.current.value = '';
      }
   }, [selectedTags, setSelectedTags]);

   const handleDeleteTag = (e, tagName) => {
      e.stopPropagation();

      setSelectedTags((prev) => prev.filter((tName) => tName !== tagName));
   };

   const handleClickSgtInput = () => {
      tagRef.current?.focus();
      setShowSgtBox(true);
      console.log('hi');
   };

   //handle rearrange suggestions
   useEffect(() => {
      const modifiedSuggestionList = tagSuggestions.filter(
         (tag) => !selectedTags.includes(tag.tagName)
      );

      setAvailableTags(modifiedSuggestionList);
      setSuggestions(modifiedSuggestionList);
   }, [selectedTags]);

   // //handle click outside
   useEffect(() => {
      if (outsideOfSgtInput && outsideOfSgtBox) {
         setShowSgtBox(false);
      }
   }, [outsideOfSgtInput, outsideOfSgtBox]);

   // dynamic suggestion box position
   useEffect(() => {
      const sgtInput = document.getElementById('sgtInput');
      const initialPx = selectedTags.length > 0 ? 128 : 102;
      const topPx = initialPx + sgtInput.offsetHeight;
      const finalTopPx = hasCvImg ? topPx + 90 : topPx;
      setSgtBoxTopPx(finalTopPx);
   }, [selectedTags.length, hasCvImg]);

   // select tags with down | up arrow
   useEffect(() => {
      const setIdx = (e) => {
         const keyCode = e.keyCode;

         if (showSgtBox && selectedTags.length < 3) {
            if (keyCode === 40) {
               // keydown
               if (currentIdx === availableTags.length - 1) {
                  setCurrentIdx(0);
               } else {
                  setCurrentIdx((prev) => prev + 1);
               }

               setKeyCode(keyCode);
            } else if (keyCode === 38) {
               // keyup
               if (currentIdx === 0 || currentIdx === -1) {
                  setCurrentIdx(availableTags.length - 1);
               } else {
                  setCurrentIdx((prev) => prev - 1);
               }

               setKeyCode(keyCode);
            }

            //enter
            if (keyCode === 13 && currentIdx >= 0) {
               const selectedTagName = availableTags[currentIdx].tagName;
               handleSelectTag(selectedTagName);
            } else if (keyCode === 13) {
               handleSelectCustomTag();
            }
         }
      };

      window.addEventListener('keydown', setIdx);

      return () => window.removeEventListener('keydown', setIdx);
   }, [
      availableTags,
      currentIdx,
      handleSelectCustomTag,
      handleSelectTag,
      selectedTags.length,
      showSgtBox,
   ]);

   console.log({ currentIdx, showSgtBox });

   // clear current idex
   useEffect(() => {
      setCurrentIdx(-1);
   }, [availableTags.length]);

   return (
      <>
         <ul
            id='sgtInput'
            className={`w-full mb-3 shadow ${
               showSgtBox ? 'rounded-t-md' : 'rounded-md'
            } bg-cardBg p-1 px-2 flex gap-2 cursor-text flex-wrap `}
            onClick={handleClickSgtInput}
            ref={sgtInputRef}
         >
            {selectedTags.map((tagName) => (
               <li
                  key={tagName}
                  className='lowercase h-8 flex items-center text-center bg-tagBg p-2 rounded-md cursor-pointer select-none'
                  onDoubleClick={(e) => handleDeleteTag(e, tagName)}
               >
                  <p>{tagName.toLowerCase()}</p>
               </li>
            ))}

            {selectedTags.length < 3 && (
               <li className='h-8 w-40'>
                  <input
                     ref={tagRef}
                     onChange={handleTagSgt}
                     // onBlur={handleSelectCustomTag}
                     type='text'
                     className={`bg-cardBg w-full rounded-md h-full p-2 focus-outline ${
                        formError.emptyField.includes('tags') &&
                        'outline-red-400 dark:outline-red-500'
                     }`}
                     placeholder={`Add up to ${
                        3 - selectedTags.length
                     } tags...`}
                  />
               </li>
            )}
         </ul>

         {/* suggestion box */}
         {showSgtBox && selectedTags.length < 3 && (
            <div
               ref={sgtBoxRef}
               id='sgtBox'
               className={`bg-cardBg w-full max-w-xl max-h-[320px] overflow-auto rounded-b-md absolute`}
               style={{ top: `${sgtBoxTopPx}px` }}
            >
               {availableTags.map((tag, i) => (
                  <SGT
                     idx={i}
                     currentIdx={currentIdx}
                     keyCode={keyCode}
                     {...tag}
                     key={tag.tagName}
                     onClick={handleSelectTag}
                  />
               ))}
            </div>
         )}
      </>
   );
};

export default TagSuggestion;
