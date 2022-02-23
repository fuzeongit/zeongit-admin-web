const keyframes = {}

keyframes[`progress-circular-rotate`] = {
  to: {
    transform: "rotate(1turn)"
  }
}

keyframes[`progress-circular-dash`] = {
  "0%": {
    "stroke-dasharray": "1, 200",
    "stroke-dashoffset": "0px"
  },
  "50%": {
    "stroke-dasharray": "100, 200",
    "stroke-dashoffset": "-15px"
  },
  to: {
    "stroke-dasharray": "100, 200",
    "stroke-dashoffset": "-124px"
  }
}

const animation = {}
animation[`progress-circular-rotate`] = `progress-circular-rotate 1.4s linear infinite`
animation[`progress-circular-dash`] = `progress-circular-dash 1.4s linear infinite`

module.exports = { keyframes, animation }