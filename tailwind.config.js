/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { },
  plugins: [
    require('@headlessui/tailwindcss'),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["cupcake", "dracula"],
    darkTheme: "dracula"
  },
}