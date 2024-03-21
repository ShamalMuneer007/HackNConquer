/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  darkMode: "selector",
  theme: {
    // fontFamily: {
    //   sans: ["Roboto", "sans-serif"],
    // },
    extend: {
      backgroundColor: ["dark"],
      borderColor: ["dark"],
      textColor: ["dark"],
      colors: {
        dark: {
          100: "#2d303d",
          200: "#1a202c",
          300: "#4a5568",
          400: "#718096",
          500: "#a0aec0",
          600: "#cbd5e0",
          700: "#e2e8f0",
          800: "#edf2f7",
          900: "#f7fafc",
        },
        primary: "#5BBA0C",
      },
    },
  },
  plugins: [],
});
