const plugin = require("tailwindcss/plugin")
const utils = require("./utils")

module.exports = plugin(({ addComponents, theme }) => {
  const CLASS_NAME = "text-fields"
  const colors = utils.getColors(theme("colors"))
  const colorClass = {}
  colors.forEach((it) => {
    // colorClass[`.${CLASS_NAME}.${CLASS_NAME}-${it.name}>div`] = {
    //   [["@apply", "text-" + it.name, "text-opacity-50"].join(" ")]: ""
    // }
    colorClass[`.${CLASS_NAME}-${it.name}>div.focus>span`] = {
      [["@apply", "text-" + it.name].join(" ")]: ""
    }
    // colorClass[`.${CLASS_NAME}.${CLASS_NAME}-${it.name}>div.has-value`] = {
    //   [["@apply", "text-opacity-100"].join(" ")]: ""
    // }
    // colorClass[`.${CLASS_NAME}.${CLASS_NAME}-${it.name}>input`] = {
    //   [["@apply", "border-" + it.name].join(" ")]: ""
    // }
    colorClass[`.${CLASS_NAME}-${it.name}>div.focus`] = {
      [["@apply", "after:border-" + it.name].join(" ")]: ""
    }
  })

  const styles = ["@apply"]
  styles.push("pt-6")
  styles.push("text-gray-500")

  const labelStyles = ["@apply"]
  labelStyles.push("inline-block", "relative", "h-9", "w-full")
  labelStyles.push(
    "after:transition",
    "after:duration-500",
    "after:border-b-[3px]",
    "after:border-solid",
    "after:box-content",
    "after:absolute",
    "after:left-0",
    "after:right-0",
    "after:bottom-0",
    "after:scale-0",
    "after:bg-transparent"
  )

  const inputStyles = ["@apply"]
  inputStyles.push(
    "bg-transparent",
    "outline-none",
    "h-full",
    "w-full",
    "text-sm",
    "border-b",
    "border-solid",
    "border-opacity-50"
  )

  const spanStyles = ["@apply"]
  spanStyles.push(
    "left-0",
    "leading-9",
    "right-auto",
    "absolute",
    "duration-200",
    "origin-top-left",
    "cursor-text"
  )

  const buttonStyles = ["@apply"]
  buttonStyles.push("h-6", "w-6", "absolute", "right-0", "bottom-1.5")

  addComponents(
    Object.assign(
      {
        [`.${CLASS_NAME}`]: {
          [styles.join(" ")]: ""
        },
        [`.${CLASS_NAME}>div`]: {
          [labelStyles.join(" ")]: ""
        },
        [`.${CLASS_NAME}>div>label>input`]: {
          [inputStyles.join(" ")]: ""
        },
        [`.${CLASS_NAME}>div>label>span`]: {
          [spanStyles.join(" ")]: ""
        },
        [`.${CLASS_NAME}>div>button`]: {
          [buttonStyles.join(" ")]: ""
        },
        [`.${CLASS_NAME}>div.focus`]: {
          [["@apply", "after:scale-100"].join(" ")]: ""
        },
        [`.${CLASS_NAME}>div.focus>label>span`]: {
          [["@apply", "scale-75", "-translate-y-5", "cursor-default"].join(
            " "
          )]: ""
        },
        [`.${CLASS_NAME}>div.has-value>label>span`]: {
          [["@apply", "scale-75", "-translate-y-5"].join(" ")]: ""
        }
      },
      colorClass
    )
  )
})
