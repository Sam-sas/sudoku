/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#faf7f0",
          100: "#f1ead8",
          200: "#e0cfa7",
          300: "#cfb47a",
          400: "#c49f5b",
          500: "#b98647",
          600: "#a36b3c",
          700: "#885235",
          800: "#704330",
          900: "#5d382a",
          950: "#341c14",
        },
      },
    },
  },
  plugins: [],
};
