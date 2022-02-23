const plugin = require("tailwindcss/plugin")
const utils = require("./utils")

module.exports = plugin(({ addComponents, theme }) => {
  const CLASS_NAME = "checkbox"
  const colors = utils.getColors(theme("colors"))
  const colorClass = {}
  colors.forEach((it) => {
    const styles = ["@apply"]
    styles.push("bg-" + it.name)
    styles.push("border-" + it.name)
    styles.push("focus:ring-" + it.name)
    styles.push("bg-opacity-0")
    colorClass[`.${CLASS_NAME}-${it.name}`] = {
      [styles.join(" ")]: ""
    }
  })

  const styles = ["@apply"]
  styles.push(
    "relative",
    "h-4",
    "w-4",
    "cursor-pointer",
    "transform",
    "duration-200",
    "inline-flex",
    "justify-center",
    "items-center",
    "border-2",
    "rounded-sm",
    "text-white"
  )

  const controlsStyles = ["@apply"]
  controlsStyles.push("absolute", "inset-0")

  addComponents(Object.assign(
    {
      [`.${CLASS_NAME}`]: {
        [styles.join(" ")]: ""
      },
      [`.${CLASS_NAME} .controls`]: {
        [controlsStyles.join(" ")]: ""
      },
      [`.${CLASS_NAME}.checked`]: {
        "@apply !bg-opacity-100": ""
      }
    },
    colorClass
  ))
})
