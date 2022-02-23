const plugin = require("tailwindcss/plugin")

module.exports = plugin(({ addComponents, theme }) => {
  const CLASS_NAME = "card"
  const styles = ["@apply"]
  styles.push(
    "rounded-sm",
    "shadow-md",
    "overflow-hidden",
  )

  addComponents({
    [`.${CLASS_NAME}`]: {
      [styles.join(" ")]: ""
    }
  })
})
