/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
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
        coriander: {
          50: "#f5f6ef",
          100: "#e8eadd",
          200: "#d3d7bf",
          300: "#bec5a4",
          400: "#9aa576",
          500: "#7d8959",
          600: "#616c44",
          700: "#4b5437",
          800: "#3e4430",
          900: "#373c2b",
          950: "#1c1f14",
        },
      },
      fontFamily: {
        pencil: ['"Custom Font"', "Special Elite"],
        writtenIn: ['"Custom Font"', "Macondo"],
        newspaper: ['"Custom Font"', "Newsreader"],
      },
    },
  },
  plugins: [],
};
