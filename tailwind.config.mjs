/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ebfef4",
          100: "#d0fbe3",
          200: "#a4f6cd",
          300: "#6aebb3",
          400: "#2fd893",
          500: "#0abf7b",
          600: "#008e5c",
          700: "#007c54",
          800: "#036243",
          900: "#045039",
          950: "#012d21",
        },
        ink: "#231F20",
        cream: "#F6F2EA",
      },
      fontFamily: {
        sans: ['"Raleway Variable"', "sans-serif"],
        display: ['"Fraunces Variable"', "serif"],
      },
    },
  },
  plugins: [],
};
