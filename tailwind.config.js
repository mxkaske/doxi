/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./contentlayer.config.ts"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        // CUSTOMIZATION: change the colors.*
        // brand: colors.green,
        // DEMO: used in <ChangeBrandColor />
        brand: {
          50: "rgb(var(--brand-color-50) / <alpha-value>)",
          100: "rgb(var(--brand-color-100) / <alpha-value>)",
          200: "rgb(var(--brand-color-200) / <alpha-value>)",
          300: "rgb(var(--brand-color-300) / <alpha-value>)",
          400: "rgb(var(--brand-color-400) / <alpha-value>)",
          500: "rgb(var(--brand-color-500) / <alpha-value>)",
          600: "rgb(var(--brand-color-600) / <alpha-value>)",
          700: "rgb(var(--brand-color-700) / <alpha-value>)",
          800: "rgb(var(--brand-color-800) / <alpha-value>)",
          900: "rgb(var(--brand-color-900) / <alpha-value>)",
          950: "rgb(var(--brand-color-950) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
