// const plugin = require("tailwindcss/plugin")
const theme = require("./tailwindcss/animation/theme")
const globalAnimation = require("./tailwindcss/animation/global")

const xs = 0,
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  xxl = 1536

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#0B99FF",
        auxiliary: "#8CC5FF",
        error: "#FF5252",
        waring: "#FB8C00"
      },
      screens: {
        "xs-only": { max: `${sm - 1}px` },
        "sm-only": { min: `${sm}px`, max: `${md - 1}px` },
        "sm-and-down": { max: `${md - 1}px` },
        "sm-and-up": { min: `${sm}px` },
        "md-only": { min: `${md}px`, max: `${lg - 1}px` },
        "md-and-down": { max: `${lg - 1}px` },
        "md-and-up": { min: `${md}px` },
        "lg-only": { min: `${lg}px`, max: `${xl - 1}px` },
        "lg-and-down": { max: `${xl - 1}px` },
        "lg-and-up": { min: `${lg}px` },
        "xl-only": { min: `${xl}px`, max: `${xxl - 1}px` },
        "xl-and-down": { max: `${xxl - 1}px` },
        "xl-and-up": { min: `${xl}px` },
        "2xl-only": { min: `${xxl}px` }
      },
      keyframes: {
        ...theme.keyframes,
        ...globalAnimation.keyframes
      },
      animation: {
        ...theme.animation,
        ...globalAnimation.animation
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("./tailwindcss/text-button"),
    require("./tailwindcss/outline-button"),
    require("./tailwindcss/elevated-button"),
    require("./tailwindcss/icon-button"),
    require("./tailwindcss/fab-button"),
    require("./tailwindcss/input"),
    require("./tailwindcss/switch"),
    require("./tailwindcss/checkbox"),
    require("./tailwindcss/radio"),
    require("./tailwindcss/chip"),
    require("./tailwindcss/form"),
    require("./tailwindcss/card"),
    require("./tailwindcss/divider"),
    require("./tailwindcss/text-fields"),
    require("./tailwindcss/typography"),
    require("./tailwindcss/alert"),
    require("./tailwindcss/animation/base")
  ]
}
