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
          50: "#f4faeb",
          100: "#e6f3d4",
          200: "#cfe8ae",
          300: "#afd77f",
          400: "#91c556",
          500: "#77b03a",
          600: "#588729",
          700: "#446823",
          800: "#395321",
          900: "#324720",
          950: "#18260d",
        },
      },
      fontFamily: {
        pencil: ['"Custom Font"', "Special Elite"],
        writtenIn: ['"Custom Font"', "Macondo"],
        newspaper: ['"Custom Font"', "Newsreader"],
      },
    },
  },
  plugins: [require('tailwindcss-motion')], 
};
