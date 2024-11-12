/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: '#94A187',
        coral: '#FF6B6B',
      },
      fontFamily: {
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      // Remove or comment out the animation definition
      // animation: {
      //   'glow': 'glow 3s ease-in-out infinite',
      // },
      // keyframes: {
      //   glow: {
      //     '0%, 100%': { textShadow: '0 0 0px rgba(255, 255, 255, 0)' },
      //     '50%': { textShadow: '0 0 8px rgb(255, 255, 255)' },
      //   }
      // },
    },
  },
  plugins: [],
};