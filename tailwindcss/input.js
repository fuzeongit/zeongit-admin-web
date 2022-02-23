const plugin = require("tailwindcss/plugin")
const utils = require("./utils")

module.exports = plugin(({ addComponents, theme }) => {
  const CLASS_NAME = "input"
  const colors = utils.getColors(theme("colors"))
  const colorClass = {}
  colors.forEach((it) => {
    const styles = ["@apply"]
    styles.push("focus:ring-" + it.name)
    // styles.push("border-" + it.name)
    colorClass[`.${CLASS_NAME}-${it.name}`] = {
      [styles.join(" ")]: ""
    }
  })

  const styles = ["@apply"]
  styles.push(
    "px-4",
    "text-sm",
    "font-medium",
    "h-9",
    "shadow-sm",
    "sm:text-sm",
    "border",
    "rounded-sm",
    "outline-none",
    "transform",
    "duration-200",
    "ring-current"
  )

  styles.push("focus:ring-2", "focus:border-white")

  const inputs = Object.assign(
    {
      [`.${CLASS_NAME}`]: {
        [styles.join(" ")]: ""
      },
      [`textarea.${CLASS_NAME}`]: {
        "@apply py-2 h-auto": ""
      }
    },
    colorClass
  )

  addComponents(inputs)
})
