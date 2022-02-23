const plugin = require("tailwindcss/plugin")
const utils = require("./utils")

module.exports = plugin(({ addComponents, theme }) => {
  const CLASS_NAME = "switch"
  const colors = utils.getColors(theme("colors"))
  const colorClass = {}
  colors.forEach((it) => {
    const styles = ["@apply"]
    styles.push("bg-" + it.name)
    styles.push("border-" + it.name)
    styles.push("focus:ring-" + it.name)
    styles.push("bg-opacity-50")
    colorClass[`.${CLASS_NAME}-${it.name}`] = {
      [styles.join(" ")]: ""
    }
  })

  const styles = ["@apply"]
  styles.push(
    "relative",
    "inline-flex",
    "items-center",
    "h-6",
    "rounded-full",
    "w-11",
    "bg-black",
    "transform",
    "duration-200"
  )

  const controlsStyles = ["@apply"]
  controlsStyles.push(
    "inline-block",
    "w-5",
    "h-5",
    "transform",
    "duration-200",
    "bg-white",
    "rounded-full",
    "cursor-pointer",
    "translate-x-1"
  )

  addComponents(
    Object.assign(
      {
        [`.${CLASS_NAME}`]: {
          [styles.join(" ")]: ""
        },
        [`.${CLASS_NAME} .controls`]: {
          [controlsStyles.join(" ")]: ""
        },
        [`.${CLASS_NAME}.checked`]: {
          "@apply !bg-opacity-100": ""
        },
        [`.${CLASS_NAME}.checked .controls`]: {
          "@apply !translate-x-5": ""
        }
      },
      colorClass
    )
  )
})
