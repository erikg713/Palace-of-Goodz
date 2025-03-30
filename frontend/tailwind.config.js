module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], // Use 'content' if using Tailwind CSS v3
  darkMode: 'class', // or 'media' for media-query based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#1a202c', // Add primary color
        secondary: '#2d3748', // Add secondary color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font family
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms'), // Add form utilities
    require('@tailwindcss/typography'), // Add typography utilities
  ],
};
