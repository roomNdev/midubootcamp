module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.html",
    "./src/**/*.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        palepurple: "#E8D7F1",
        thistle: "#F7C3E8",
        pearlypurple: "#A167A5",
        spanishviolet : "#4A306D"
      },}
  },
  variants: {},
  plugins: [],
}