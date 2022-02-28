import dayjs from "dayjs"

/**
 * 日期处理工具类
 */

// 可接受的Date
type WideDate = number | string | Date

const SECONDS = 1000
const MINUTES = 60 * SECONDS
const HOURS = 60 * MINUTES
const DAY = 24 * HOURS
// 一月当作30天
const MONTH = 30 * DAY
// 一年当作有365天
const YEAR = 12 * MONTH + 5

interface DateModel {
  yyyy: number
  MM: number
  dd: number
  HH: number
  mm: number
  ss: number
}

type Accuracy = keyof DateModel

/**
 * 分钟计算
 * @param date 初始的日期
 * @param delta 需要变化的日期
 * @returns
 */
export const addMinutes = (date: WideDate = new Date(), delta = 0) => {
  const newDate = new Date(date)
  newDate.setMinutes(newDate.getMinutes() + delta)
  return newDate
}

/**
 * 小时计算
 * @param date 初始的日期
 * @param delta 需要变化的日期
 * @returns
 */
export const addHours = (date: WideDate = new Date(), delta = 0) => {
  const newDate = new Date(date)
  newDate.setHours(newDate.getHours() + delta)
  return newDate
}

/**
 * 日期计算
 * @param date 初始的日期
 * @param delta 需要变化的日期
 * @returns
 */
export const addDays = (date: WideDate = new Date(), delta = 0) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + delta)
  return newDate
}

/**
 * 月份计算
 * @param date 初始的日期
 * @param delta 需要变化的月份
 * @returns
 */
export const addMonth = (date: WideDate = new Date(), delta = 0) => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + delta)
  return newDate
}

/**
 * 月份计算
 * @param date 初始的日期
 * @param delta 需要变化的年份
 * @returns
 */
export const addYear = (date: WideDate = new Date(), delta = 0) => {
  const newDate = new Date(date)
  newDate.setFullYear(newDate.getFullYear() + delta)
  return newDate
}

/**
 * 对比两个年份是否一致
 * @param value
 * @param target
 * @returns
 */
export const equalsYear = (value: Date, target: Date) => {
  return value.getFullYear() === target.getFullYear()
}

/**
 * 对比两个月份是否一致
 * @param value
 * @param target
 * @returns
 */
export const equalsMonth = (value: Date, target: Date) => {
  return (
    value.getFullYear() === target.getFullYear() &&
    value.getMonth() === target.getMonth()
  )
}

/**
 * 对比两个日期是否一致
 * @param value
 * @param target
 * @returns
 */
export const equalsDay = (value: Date, target: Date) => {
  return (
    value.getFullYear() === target.getFullYear() &&
    value.getMonth() === target.getMonth() &&
    value.getDate() === target.getDate()
  )
}

/**
 * 两日期的差值
 * @param date 减去日期
 * @param defaultDate 被减日期
 * @param accuracy 精度
 * @returns
 */
export const differTo = (
  date: WideDate = new Date(),
  defaultDate: WideDate = new Date(),
  accuracy: Accuracy = "yyyy"
) => {
  const dateFormat = new Date(date)
  const defaultDateFormat = new Date(defaultDate)
  const timeStamp = defaultDateFormat.getTime() - dateFormat.getTime()

  const dateModel: DateModel = {
    yyyy: 0,
    MM: 0,
    dd: 0,
    HH: 0,
    mm: 0,
    ss: 0
  }
  const remainder: DateModel = {
    yyyy: 0,
    MM: 0,
    dd: 0,
    HH: 0,
    mm: 0,
    ss: 0
  }
  const defaultModel: DateModel = {
    yyyy: YEAR,
    MM: MONTH,
    dd: DAY,
    HH: HOURS,
    mm: MINUTES,
    ss: SECONDS
  }

  // 找出精度所在位置
  const index = Object.keys(dateModel).findIndex((it) => it === accuracy)

  // 临时时间戳
  let tempStamp = timeStamp
  Object.keys(remainder).forEach((it, i) => {
    // 如果大于等于所在下标则开始指向
    if (i >= index) {
      tempStamp = tempStamp % defaultModel[it as Accuracy]
      remainder[it as Accuracy] = tempStamp
    }
  })

  tempStamp = timeStamp
  Object.keys(dateModel).forEach((it, i) => {
    if (i >= index) {
      dateModel[it as Accuracy] = Math.floor(
        tempStamp / defaultModel[it as Accuracy]
      )
      tempStamp = remainder[it as Accuracy]
    }
  })

  return { timeStamp, ...dateModel }
}

/**
 * 格式化时间
 * @param date
 * @param formatString
 * @returns
 */
export const format = (date?: Date, formatString = "YYYY-MM-DD HH:mm:sss") => {
  return date ? dayjs(date).format(formatString) : ""
}

/**
 * 生成时间列表
 * @param date
 * @param long
 * @returns
 */
export const dateToTimeList = (date: Date, long: number) => {
  let i = 0
  const list: string[] = []
  while (i < long) {
    list.push(format(addMinutes(date, i), "HH:mm"))
    i++
  }
  return list
}

/**
 * 中文描述时间距现在的时间
 * @param date
 * @returns
 */
export const getChineseAgo = (date = new Date()) => {
  const differ = differTo(date)
  const keys = Object.keys(differ)
  for (const key of keys) {
    if (key === "yyyy" && differ[key] > 0) {
      return differ[key] + "年前"
    } else if (key === "MM" && differ[key] > 0) {
      return differ[key] + "月前"
    } else if (key === "dd" && differ[key] > 0) {
      return differ[key] + "天前"
    } else if (key === "HH" && differ[key] > 0) {
      return differ[key] + "小时前"
    } else if (key === "mm" && differ[key] > 0) {
      return differ[key] + "分钟前"
    } else if (key === "ss" && differ[key] > 0) {
      return differ[key] + "秒前"
    }
  }
}

/**
 * 获取日期的开始时间
 * @param date
 * @returns
 */
export const getStartTime = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * 获取日期的结束时间
 * @param date
 * @returns
 */
export const getEndTime = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  )
}

/**
 * 获取日期下的周一
 * @param date
 * @returns
 */
export const getMonday = (date: WideDate = new Date()) => {
  const day = new Date(date).getDay()
  return getStartTime(day === 0 ? addDays(date, -6) : addDays(date, -day + 1))
}

/**
 * 获取日期下的当月的第一天
 * @param date
 * @returns
 */
export const getFirstDayOfMonth = (date: WideDate = new Date()) => {
  const newDate = new Date(date)
  return new Date(newDate.getFullYear(), newDate.getMonth(), 1)
}

// 获取日期下的当年的第一天
export const getFirstDayOfYear = (date: WideDate = new Date()) => {
  const newDate = new Date(date)
  return new Date(newDate.getFullYear(), 0, 1)
}
