const plugin = require("tailwindcss/plugin")

module.exports = plugin(({ addComponents, theme }) => {
  const FORM_ITEM_CLASS_NAME = "form-item"
  const styles = ["@apply"]
  styles.push(
    "inline-flex",
    "justify-center",
    "items-center",
    "h-9",
    "align-bottom"
  )

  addComponents({
    [`.${FORM_ITEM_CLASS_NAME}`]: {
      [styles.join(" ")]: ""
    }
  })
})
