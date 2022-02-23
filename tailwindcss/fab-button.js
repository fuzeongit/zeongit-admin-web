const plugin = require("tailwindcss/plugin")
const utils = require("./utils")

module.exports = plugin(({ addComponents, theme }) => {
  const CLASS_NAME = "fab-button"
  const colors = utils.getColors(theme("colors"))
  const colorClass = {}
  colors.forEach((it) => {
    const styles = ["@apply"]
    styles.push("bg-" + it.name)
    styles.push("ring-" + it.name)
    colorClass[`.${CLASS_NAME}-${it.name}`] = {
      [styles.join(" ")]: ""
    }
  })

  const styles = ["@apply"]
  styles.push(
    "inline-flex",
    "justify-center",
    "items-center",
    "h-9",
    "w-9",
    "text-sm",
    "font-medium",
    "text-white",
    "rounded-full",
    "relative",
    "overflow-hidden",
    "outline-none",
    "cursor-pointer",
    "transform",
    "duration-200"
  )

  styles.push(
    "after:absolute",
    "after:inset-0",
    "after:transform",
    "after:duration-200",
    "after:bg-current",
    "after:opacity-0",
    "after:box-content"
  )

  styles.push(
    "before:absolute",
    "before:inset-0",
    "before:transform",
    "before:duration-200",
    "before:bg-current",
    "before:opacity-0",
    "before:box-content"
  )

  styles.push(
    "hover:after:opacity-10",
    "focus:before:opacity-10",
    "focus:shadow-md"
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
