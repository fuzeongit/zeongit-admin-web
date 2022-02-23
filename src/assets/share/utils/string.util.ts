/**
 * 去除emoji表情
 * @param str
 */
export const removeEmoji = (str: string) => {
  return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
}

/**
 * 转驼峰命名
 * @param str
 * @param separator
 */
export const toCamelCase = (str: string, separator: string = "_") => {
  return str.replace(new RegExp(`[${separator}]+(.)`, "g"), (match, chr) =>
    chr.toUpperCase()
  )
}

/**
 * 转下划线命名
 * @param str
 * @param separator
 */
export const toUnderline = (str: string, separator: string = "_") => {
  return str.replace(
    /([A-Z])/g,
    (match, chr) => `${separator}${chr.toLowerCase()}`
  )
}

/**
 * 字符串每隔n切割成数组
 */
export const splitByLength = (str: string, n: number) => {
  return str.match(new RegExp(".{1," + n + "}", "g"))
}



