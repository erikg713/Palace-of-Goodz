/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",  // Palace of Goods brand color
        secondary: "#FF6584",
      },
    },
  },
  plugins: [],
};
