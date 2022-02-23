const steps = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

const keyframes = {}

steps.forEach((it) => {
  keyframes[`fade-in-up-${it}`] = {
    "0%": { opacity: "0", transform: `translate3d(0, ${it}%, 0)` },
    to: { opacity: "1", transform: "translateZ(0)" }
  }
  keyframes[`fade-in-right-${it}`] = {
    "0%": { opacity: "0", transform: `translate3d(${it}%, 0, 0)` },
    to: { opacity: "1", transform: "translateZ(0)" }
  }
  keyframes[`fade-in-down-${it}`] = {
    "0%": { opacity: "0", transform: `translate3d(0, -${it}%, 0)` },
    to: { opacity: "1", transform: "translateZ(0)" }
  }
  keyframes[`fade-in-left-${it}`] = {
    "0%": { opacity: "0", transform: `translate3d(-${it}%, 0, 0)` },
    to: { opacity: "1", transform: "translateZ(0)" }
  }

  keyframes[`fade-out-up-${it}`] = {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: `translate3d(0, -${it}%, 0)` }
  }
  keyframes[`fade-out-right-${it}`] = {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: `translate3d(${it}%, 0, 0)` }
  }
  keyframes[`fade-out-down-${it}`] = {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: `translate3d(0, ${it}%, 0)` }
  }
  keyframes[`fade-out-left-${it}`] = {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: `translate3d(-${it}%, 0, 0)` }
  }
})
keyframes[`fade-in`] = {
  "0%": { opacity: "0" },
  to: { opacity: "1" }
}

keyframes[`fade-out`] = {
  "0%": { opacity: "1" },
  to: { opacity: "0" }
}

const animation = {}
Object.keys(keyframes).forEach((it) => {
  animation[it] = it
})
module.exports = { keyframes, animation }
