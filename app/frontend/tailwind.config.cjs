/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class',
   theme: {
      extend: {
         screens: {
            xs: '480px',
         },
         backgroundColor: {
            mainBg: 'var(--mainBg)',
            primary: 'var(--primary)',
            headerBg: 'var(--headerBg)',
            cardBg: 'var(--cardBg)',
            tagBg: 'var(--tagBg)',
         },
         colors: {
            primary: 'var(--primary)',
            borderColor: 'var(--borderColor)',
            textColor: 'var(--textColor)',
         },
         gridTemplateColumns: {
            autoFit300: 'repeat( auto-fit, minmax(280px, 1fr) )',
         },
      },
   },
   plugins: [],
};
