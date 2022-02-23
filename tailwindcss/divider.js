const plugin = require("tailwindcss/plugin")
const utils = require("./utils")

module.exports = plugin(({ addComponents, theme }) => {
  const CLASS_NAME = "divider"
  const colors = utils.getColors(theme("colors"))
  const colorClass = {}
  colors.forEach((it) => {
    const styles = ["@apply"]
    styles.push("border-" + it.name)
    colorClass[`.${CLASS_NAME}-${it.name}`] = {
      [styles.join(" ")]: ""
    }
  })

  const styles = ["@apply"]
  styles.push(
    "block",
    "flex-1",
    "h-0",
    "border-solid"
  )

  addComponents(Object.assign(
    {
      [`.${CLASS_NAME}`]: {
        [styles.join(" ")]: ""
      }
    },
    colorClass
  ))
})
