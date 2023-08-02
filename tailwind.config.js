/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        'blue': '#4FAEAF',
        'blue-light': '#7CCFCF',
        'purple': '#607CBD',
        'purple-light': '#8AA1D7',
        'warning': '#FFD073',
        'warning-light': '#FFDD98',
        'error': '#FF7373',
        'error-light': '#FF9898',
        'gray': '#262626',
        'gray-mid': '#757474',
        'gray-light': '#d9d9d9',
        'white': '#f5f5f5'
      },
    },
  },
  plugins: [],
}

