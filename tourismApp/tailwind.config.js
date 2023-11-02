/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "customer-review": "url('/src/assets/review.jpg')",
      }
    },
  },
  plugins: [],
};
