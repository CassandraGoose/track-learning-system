/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      width: {
        "10xl": "50rem",
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#fdba74',
          secondary: '#818cf8',
          'secondary-content': '#f5f5f4',
          accent: '#4ade80',
          neutral: '#292524',
          'base-100': '#f5f5f4',
          info: '#818cf8',
          success: '#4ade80',
          warning: '#fca5a5',
          error: '#ef4444',
        },
      },
    ],
  },
};
