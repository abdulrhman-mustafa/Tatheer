/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './pages/**/*.{js,ts,jsx,tsx,mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}', 
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5500FF",
        phover: "#4201c4",
        secondary: "#28303F",
        input: "#F5F5F5",
        place: "#A3A3A3"
      },

      fontFamily: {
        lexend: ['var(--font-lexend)', 'sans-serif'],
      },
      borderRadius: {
        'sm': '12px',
        'curve': '100% 0% 100% 0% / 0% 0% 100% 100%',
      },
    },
  },
  plugins: [],
}

