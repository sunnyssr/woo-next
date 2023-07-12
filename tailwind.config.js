/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "product-image": "3 / 2",
      },
      minWidth: {
        6: "1.5rem",
      },
      fontSize: {
        xxs: "0.625rem",
        xxxs: "0.5rem",
      },
    },
  },
  plugins: [],
};
