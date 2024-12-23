/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add the font here
      },
      animation:{
        'spin-slow': 'spin 2s linear infinite', // Custom slower spin
        'spin-fast': 'spin 0.8s linear infinite', // Custom faster spin
        'spin-slower': 'spin 3s linear infinite', // Even slower spin
        'pulse-slow': 'pulse 3s infinite', // Custom slower pulse
      }
    },
  },
  plugins: [],
};
