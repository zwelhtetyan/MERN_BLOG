import { useEffect, useState } from 'react';

const useTheme = () => {
   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

   const themeToggler = () => {
      setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
   };

   useEffect(() => {
      localStorage.setItem('theme', theme);

      theme === 'dark'
         ? document.documentElement.classList.add(theme)
         : document.documentElement.classList.remove('dark');
   }, [theme]);

   return { theme, themeToggler };
};

export default useTheme;
