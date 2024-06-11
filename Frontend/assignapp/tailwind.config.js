/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
      "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        navBarcolor: '#615EFC',
        overallBackground: '#D1D8C5',
        CustomButtonCOlor :'#7E8EF1',
        fourthCustomColor:'#EEEEEE',
      },
    },
  },
  plugins: [],
}

