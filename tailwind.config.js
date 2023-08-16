/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      minHeight: {
        "800px": "800px",
      },
      height: {
        128: "1033px",
        "60p": "60%",
        "800px": "800px",
      },
      width: {
        300: "300px",
        "100px": "100px",
        "800px": "800px",
        "1000px": "1000px",
      },
      backgroundImage: {
        "logreg-pattern": "url('assets/logback.webp')",
        home: "url('assets/candy.webp')",
        error: "url('../assets/404-error-message-3702341-3119133.webp')",
      },
    },
    plugins: [],
  },
};
