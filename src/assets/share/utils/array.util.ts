/**
 * 数组的工具类
 */

/**
 * 打乱数组
 * @param arr 数组
 * @returns
 */
export const shuffle = (arr: any[]) => {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = Math.floor(Math.random() * i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

/**
 * 数组求和
 * @param arr 数组
 */
export const getSum = (arr: number[]) => {
  return arr.reduce((prev, curr) => prev + curr, 0)
}

/**
 * 数组按key求和
 * @param arr 数组
 * @param key 键值
 * @returns
 */
export const getSumByKey = (arr: any[], key: string) => {
  return arr.reduce((prev, curr) => prev + curr[key], 0)
}

/**
 * 数组去重
 * @param arr 数组
 */
export const uniq = (arr: any[]) => {
  return Array.from(new Set(arr))
}

/**
 * 数组求平均值
 * @param arr 数组
 */
export const getAverage = (arr: number[]) => {
  return getSum(arr) / arr.length
}

/**
 * 数组求中位数
 * @param arr 数组
 */
export const getMedian = (arr: number[]) => {
  arr = arr.sort((a, b) => a - b)
  const mid = Math.floor(arr.length / 2)
  return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2
}

/**
 * 一维数组转二维数组
 * @param arr 数组
 * @param row 切割的长度
 * @returns
 */
export const toTwoDimension = (arr: any[], row: number) => {
  const _arr = []
  for (let i = 0; i < arr.length; i += row) {
    _arr.push(arr.slice(i, i + row))
  }
  return _arr
}
