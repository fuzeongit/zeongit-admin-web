const plugin = require("tailwindcss/plugin")

module.exports = plugin(({ addBase }) => {
  addBase({
    h1: {
      "@apply text-6xl": ""
    },
    h2: {
      "@apply text-5xl": ""
    },
    h3: {
      "@apply text-4xl": ""
    },
    h4: {
      "@apply text-3xl": ""
    },
    h5: {
      "@apply text-2xl": ""
    },
    h6: {
      "@apply text-xl": ""
    },
    p: {
      "@apply text-base": ""
    }
  })
})
