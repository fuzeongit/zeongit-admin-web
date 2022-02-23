/**
 * 校验规则的工具类
 */

/**
 * 判断是否为手机号
 * @param phone 手机号
 * @returns
 */
export const isPhone = (phone: string) => {
  return /^1[3456789]\d{9}$/.test(phone)
}

/**
 * 判断是否为邮箱
 * @param email 邮箱
 * @returns
 */
export const isEmail = (email: string) => {
  return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
    email
  )
}

/**
 * 判断是否为身份证号
 * @param idCard 身份证号
 * @returns
 */
export const isIdCard = (idCard: string) => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)
}

/**
 * 判断是否为车牌号
 * @param carNumber 车牌号
 * @returns
 */
export const isCarNo = (carNo: string) => {
  return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(carNo)
}

/**
 * 判断是否为密码
 * @param password 密码
 * @returns
 */
export const isPassword = (password: string) => {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(password)
}

/**
 * 判断是否为银行卡号
 */
export const isBankCard = (bankCard: string) => {
  return /^(\d{16}|\d{19})$/.test(bankCard)
}
