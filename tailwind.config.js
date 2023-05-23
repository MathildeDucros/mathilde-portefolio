/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // global background color #2d2a2a
        primary: "#2d2a2a",
        // robe pale couleur claire proche du blanc #ffd3db
        secondary: "#ffd3db",
        // gris couleur principale, celle des cartes #a6a6a6"
        tertiary: "#a6a6a6",
        "black-100": "#170A0C",
        "black-200": "#292522",
        "white-100": "#F3F3F3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },

      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
