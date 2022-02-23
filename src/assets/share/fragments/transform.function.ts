import { serialize, TransformFnParams } from "class-transformer"

/**
 * 参数转换器
 */

/**
 * 将query传入数组数为1的参数转换为数组
 * @param { value } 传入的值
 * @returns
 */
export const parseArrayTransformFn = ({ value }: TransformFnParams) => {
  if (Array.isArray(value)) {
    return value
  } else {
    if (value !== undefined) {
      return [value]
    } else {
      return []
    }
  }
}

/**
 * 将传入的值变为布尔值
 * @param {value} 传入的值
 * @returns
 */
export const parseBooleanTransformFn = ({ value }: TransformFnParams) => {
  return value === "true"
}

/**
 * 将传入的值变为dateRange字符串，如：[Date,undefined]
 * @param {value} 传入的值
 * @returns
 */
export const parseDateRangeTransformFn = ({ value }: TransformFnParams) => {
  const dateRange: Array<Date | undefined> = [undefined, undefined]
  if (Array.isArray(value)) {
    value
      .filter((it, i) => i < 2)
      .forEach((it, i) => {
        dateRange[i] = value[i] ? new Date(value[i]) : undefined
      })
  } else {
    if (value !== undefined && value !== "") {
      dateRange[0] = new Date(value)
    }
  }
  return dateRange
}

/**
 *  将传入的值序列化
 * @param {value} 传入的值
 * @returns
 */
export const parseSerializeTransformFn = ({ value }: TransformFnParams) =>
  serialize(value)

/**
 *  将传入的空值转换为undefined
 * @param {value} 传入的值
 * @returns
 */
export const parseEmptyStringTransformFn = ({ value }: TransformFnParams) =>
  value.length === 0 ? undefined : value
