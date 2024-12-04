/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    screens: {
      '2.5xl': { 'max': '1700px'},  
      '2xl': { 'max': '1536px'},
      '1.5xl': { 'max': '1400px'},
      'xl': { 'max': '1280px'},
      'lg': { 'max': '1024px'},
      'md2': {'max': '900px'},
      'md': { 'max': '768px'},
      'sm': { 'max': '640px'},
      'xsm': {'max': '450px'},
    },
    extend: {
      minHeight: {
        'screen-minus-80': 'calc(100dvh - 20px)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define Inter como a fonte principal sans
      },
    },
  },
  plugins: [],
}

