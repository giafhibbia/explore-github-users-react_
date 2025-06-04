// tailwind.config.js

module.exports = {
  content: [
    // Include all JS, TS, JSX, and TSX files in the src directory
    "./src/**/*.{js,ts,jsx,tsx}",

    // Include index.html for purge (used by Create React App)
    "./public/index.html"
  ],
  theme: {
    extend: {
      // You can extend the default Tailwind theme here
    },
  },
  plugins: [
    // Add any Tailwind plugins here (e.g., typography, forms, aspect-ratio)
  ],
};
