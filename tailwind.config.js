/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E88E5', // আপনি এখানে আপনার কাস্টম রঙটি সেট করেছেন
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}