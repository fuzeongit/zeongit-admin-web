/**
 * 随机工具类
 */

/**
 * 随机生成布尔值
 */
export const randomBoolean = () => {
  return Math.random() > 0.5
}

/**
 * 随机生成手机号
 */
export const randomPhone = () => {
  let phone = ""
  for (let i = 0; i < 11; i++) {
    phone += Math.floor(Math.random() * 10)
  }
  return phone
}

/**
 * 随机生成身份证号
 */
export const randomIdCard = () => {
  let id = ""
  for (let i = 0; i < 18; i++) {
    id += Math.floor(Math.random() * 10)
  }
  return id
}

/**
 * 随机生成邮箱
 */
export const randomEmail = () => {
  let email = ""
  for (let i = 0; i < 10; i++) {
    email += Math.floor(Math.random() * 10)
  }
  email += "@qq.com"
  return email
}

/**
 * 随机生成范围内的整数
 * @param min 最小值
 * @param max 最大值
 * @returns
 */
export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 随机生成范围内的浮点数
 * @param min 最小值
 * @param max 最大值
 * @returns
 */
export const randomFloat = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

/**
 * 随机生成一个颜色
 */
export const randomColor = () => {
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16)
  }
  return color
}
