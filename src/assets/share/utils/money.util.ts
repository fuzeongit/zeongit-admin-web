/**
 * 金钱处理的工具类
 */

/**
 * 分转元
 * @param {number} cent 分
 */
export const centToYuan = (cent: number) => {
  return (cent / 100).toFixed(2)
}

/**
 * 元转分
 * @param yuan 元
 */
export const yuanToCent = (yuan: number) => {
  return yuan * 100
}
