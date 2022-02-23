const plugin = require("tailwindcss/plugin")
const utils = require("./utils")

module.exports = plugin(({ addComponents, theme }) => {
  const CLASS_NAME = "radio"
  const colors = utils.getColors(theme("colors"))
  const colorClass = {}
  colors.forEach((it) => {
    const styles = ["@apply"]
    styles.push("text-" + it.name)
    styles.push("after:bg-" + it.name)
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
    "rounded-full",
    "text-white"
  )

  styles.push(
    "after:h-1.5",
    "after:w-1.5",
    "after:transform",
    "after:duration-200",
    "after:opacity-0",
    "after:box-content",
    "after:rounded-full"
  )

  addComponents(Object.assign(
    {
      [`.${CLASS_NAME}`]: {
        [styles.join(" ")]: ""
      },
      [`.${CLASS_NAME}.checked`]: {
        "@apply border-current after:opacity-100": ""
      }
    },
    colorClass
  ))
})
