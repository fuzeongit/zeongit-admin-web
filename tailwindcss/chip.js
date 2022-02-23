const plugin = require("tailwindcss/plugin")
const utils = require("./utils")

module.exports = plugin(({ addComponents, theme }) => {
  const CLASS_NAME = "chip"
  const colors = utils.getColors(theme("colors"))
  const colorClass = {}
  colors.forEach((it) => {
    const styles = ["@apply"]
    styles.push("bg-" + it.name)
    colorClass[`.${CLASS_NAME}-${it.name}`] = {
      [styles.join(" ")]: ""
    }
  })

  const styles = ["@apply"]
  styles.push(
    "inline-flex",
    "justify-center",
    "items-center",
    "h-6",
    "px-3",
    "text-xs",
    "font-medium",
    "text-white",
    "rounded-full",
    "relative",
    "overflow-hidden",
    "outline-none",
    "transform",
    "duration-200",
    "flex-shrink-0",
    "whitespace-nowrap",
    "overflow-ellipsis",
    "max-w-full"
  )

  addComponents(
    Object.assign(
      {
        [`.${CLASS_NAME}`]: {
          [styles.join(" ")]: ""
        }
      },
      colorClass
    )
  )
})
