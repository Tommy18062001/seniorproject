/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        newlg: "960px",
        newmd: "860px",
        xs: "480px"
      },

      backgroundImage: {
        "customer-review": "url('/src/assets/review.jpg')",
      },
      keyframes: {
        borderAnimation: {
          "0%": { width: "0px" },
          "100%": { width: "50px" },
        },
      },
      animation: {
        borderAnimation: "borderAnimation 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
