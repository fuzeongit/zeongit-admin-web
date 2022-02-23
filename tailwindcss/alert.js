const plugin = require("tailwindcss/plugin")
const utils = require("./utils")

module.exports = plugin(({ addComponents, theme }) => {
  const CLASS_NAME = "alert"

  const colors = utils.getColors(theme("colors"))
  const colorClass = {}
  colors.forEach((it) => {
    colorClass[`.${CLASS_NAME}-${it.name}`] = {
      [["@apply", "before:border-" + it.name].join(" ")]: ""
    }
    colorClass[`.${CLASS_NAME}-prominent-${it.name}`] = {
      [[
        "@apply",
        "bg-opacity-10",
        "before:border-opacity-25",
        "bg-" + it.name,
        "text-" + it.name,
        "before:border-" + it.name
      ].join(" ")]: ""
    }
  })

  const styles = ["@apply"]
  styles.push("bg-white", "relative", "overflow-hidden", "text-gray-600")

  styles.push("before:box-content", "before:absolute", "before:border-solid")

  addComponents(
    Object.assign(
      {
        [`.${CLASS_NAME}`]: {
          [styles.join(" ")]: ""
        },
        [`.${CLASS_NAME}.${CLASS_NAME}-top`]: {
          [[
            "@apply",
            "before:border-4",
            "before:top-0",
            "before:left-0",
            "before:right-0"
          ].join(" ")]: ""
        },
        [`.${CLASS_NAME}.${CLASS_NAME}-right`]: {
          [[
            "@apply",
            "before:border-4",
            "before:top-0",
            "before:right-0",
            "before:bottom-0"
          ].join(" ")]: ""
        },
        [`.${CLASS_NAME}.${CLASS_NAME}-bottom`]: {
          [[
            "@apply",
            "before:border-4",
            "before:right-0",
            "before:bottom-0",
            "before:left-0"
          ].join(" ")]: ""
        },
        [`.${CLASS_NAME}.${CLASS_NAME}-left`]: {
          [[
            "@apply",
            "before:border-4",
            "before:bottom-0",
            "before:left-0",
            "before:top-0"
          ].join(" ")]: ""
        }
      },
      colorClass
    )
  )
})
