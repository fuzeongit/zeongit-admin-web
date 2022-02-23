import { isEmail, isPhone } from "./rule.util"

/**
 * 快速获取校验函数
 */

/**
 * 获取手机号码的提示信息
 * @param message 错误提示
 * @returns
 */
export const getErrorPhoneMessage = (message: string) => {
  return (value: string) => (isPhone(value) ? undefined : message)
}

/**
 * 获取邮箱的提示信息
 * @param message 错误提示
 * @returns
 */
export const getErrorEmailMessage = (message: string) => {
  return (value: string) => (isEmail(value) ? undefined : message)
}

/**
 * 获取空字符串的提示信息
 * @param message 错误提示
 * @returns
 */
export const getRequiredMessage = (message: string) => {
  return (value?: string) =>
    value !== undefined && value !== null && value !== "" ? undefined : message
}
