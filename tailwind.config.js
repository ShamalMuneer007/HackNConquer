/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
          100: "#1a202c",
          200: "#2d3748",
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
};
