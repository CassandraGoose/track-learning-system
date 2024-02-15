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
    colors: {
      'bright': '#f8f7ff',
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        // i don't appreciate DaisyUI's lack of communication regarding how they use colors, so I'm just over-riding everything to be dark grey and utilizing colors on my own beyond that.
        // for example, i don't know what they use and where, and i dont' want to spend time chasing the information down, since my style is fundamentally different than what DaisyUI prescribes. 
        mytheme: {
          primary: '#323031', // daisy requires, currently dark grey
          secondary: '#323031', // daisy requires, currently dark grey
          accent: '#323031', //daisy requires, currently dark grey
          'base-100': '#323031', // daisy requires, currently dark grey
          neutral: '#323031', // daisy requires
          error: '#EC6466', // daisy requires 
        },
      },
    ],
  },
};
