/**
 * 数字的工具类
 */

/**
 * 转化为百分比字符串
 * @param value
 * @param precision
 * @returns
 */
export const toPercent = (value: number, precision = 2) =>
  value.toFixed(precision) + "%"

/**
 * 最大显示数字
 * @param value
 * @param threshold
 * @returns
 */
export const toMore = (value: number, threshold: number) =>
  value > threshold ? threshold : value

/**
 * 最小显示数字
 * @param value
 * @param threshold
 * @returns
 */
export const toLess = (value: number, threshold: number) =>
  value < threshold ? threshold : value
