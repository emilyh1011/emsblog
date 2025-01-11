/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //Add custom colors, add a light blue(same as logo)
      //If want to just add some custom colors, but each custome color
      //doesn't have different shades, we can define these colors with DEFAULT
      //key instead of using numbers to specify diff shades(100 200 300)
      colors:{
        lightblue: {
          DEFAULT: '#96d8ff'

        },
        lightyellow:{
          DEFAULT: '#ffe88b'
        }
      },
      //serif is the fallback backup font if Merriweather can't be used
      fontFamily:{
        'merriweather': ['Merriweather', 'serif']
      }
    },
  },
  plugins: [],
}

