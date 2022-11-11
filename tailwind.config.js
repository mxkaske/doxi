/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./contentlayer.config.ts"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
