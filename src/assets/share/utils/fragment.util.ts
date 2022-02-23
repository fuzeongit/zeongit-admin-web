/**
 * 琐碎的工具类
 */

import { interval, Observer, take } from "rxjs"

/**
 * 沉睡函数
 * @param ms 毫秒数
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 *  空函数
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {}

/**
 * 倒数计时
 * @param ms 毫秒数
 * @param wait 每次回调间隔
 * @param observer rxjs的观察者
 */
export const countdown = (
  ms: number,
  wait = 1000,
  observer?: Partial<Observer<number>>
) => {
  return interval(wait)
    .pipe(take(Math.ceil(ms / wait)))
    .subscribe(observer)
}

/**
 * 混入，如果基类是子类，那基类父类的方法也不会被混入
 * @param derivedCtor 派生类
 * @param baseCtors 基类
 */
export const applyMixins = (derivedCtor: any, baseCtors: any[]) => {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      derivedCtor.prototype[name] = baseCtor.prototype[name]
    })
  })
}

/**
 * 获取循环的下标
 * @param index 超出范围的下标
 * @param length 长度
 * @returns
 */
export const getLoopValue = (index: number, length: number) => {
  const temp = index % length
  return index >= 0 ? temp : length + temp
}

/**
 * 消去null，用undefined代替
 * @param value
 * @returns
 */
export const removeNull = <T>(value: T | null) => {
  if (value === null) return undefined
  return value
}
