const plugin = require("tailwindcss/plugin")

module.exports = plugin(({ addUtilities }) => {
  const CLASS_NAME = "animate"
  const DURATIONS = [75, 100, 150, 200, 300, 500, 700, 1000]
  const TIMING_FUNCTION = {
    "ease-linear": "linear",
    "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
    "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
    "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
  }

  const COUNT = ["infinite"]
  const classList = {}

  DURATIONS.forEach((it) => {
    classList[`.${CLASS_NAME}-duration-${it}`] = {
      "animation-duration": it + "ms"
    }
  })
  DURATIONS.forEach((it) => {
    classList[`.${CLASS_NAME}-delay-${it}`] = {
      "animation-delay": it + "ms"
    }
  })

  Object.keys(TIMING_FUNCTION).forEach((key) => {
    classList[`.${CLASS_NAME}-${key}`] = {
      "animation-timing-function": TIMING_FUNCTION[key]
    }
  }) 
  COUNT.forEach((it) => {
    classList[`.${CLASS_NAME}-iteration-count-${it}`] = {
      "animation-iteration-count": it
    }
  })

  addUtilities(classList)
})
