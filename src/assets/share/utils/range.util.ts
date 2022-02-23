/**
 * 区间的工具类
 */

/**
 * 是否在区间内
 * @param value
 * @param min
 * @param max
 * @returns
 */
export const isInRange = (value: number, min: number, max: number) => {
  return value >= min && value <= max
}

/**
 * 是否在左开区间内
 * @param value
 * @param min
 * @param max
 * @returns
 */
export const isInLeftRange = (value: number, min: number, max: number) => {
  return value > min && value <= max
}

/**
 * 是否在右开区间内
 * @param value
 * @param min
 * @param max
 * @returns
 */
export const isInRightRange = (value: number, min: number, max: number) => {
  return value >= min && value < max
}

/**
 * 是否在左右开区间内
 * @param value
 * @param min
 * @param max
 * @returns
 */
export const isInBothRange = (value: number, min: number, max: number) => {
  return value > min && value < max
}

/**
 * 获取区间
 * @param min
 * @param max
 * @param step
 * @returns
 */
export const getRange = (min: number, max: number, step: number) => {
  const range: number[] = []
  for (let i = min; i <= max; i += step) {
    range.push(i)
  }
  return range
}

/**
 * 获取左开区间
 * @param min
 * @param max
 * @param step
 * @returns
 */
export const getLeftRange = (min: number, max: number, step: number) => {
  const range: number[] = []
  for (let i = min + step; i <= max; i += step) {
    range.push(i)
  }
  return range
}

/**
 * 获取右开区间
 * @param min
 * @param max
 * @param step
 * @returns
 */
export const getRightRange = (min: number, max: number, step: number) => {
  const range: number[] = []
  for (let i = min; i < max; i += step) {
    range.push(i)
  }
  return range
}

/**
 * 获取左右开区间
 * @param min
 * @param max
 * @param step
 * @returns
 */
export const getBothRange = (min: number, max: number, step: number) => {
  const range: number[] = []
  for (let i = min + step; i < max; i += step) {
    range.push(i)
  }

  return range
}
