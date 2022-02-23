/**
 * 对象的工具类
 */

/**
 * 根据键值列表判断对象是否相等
 * @param obj1 对象1
 * @param obj2 对象2
 * @param keys 键值列表
 */
export const equalObjectByKeys = (obj1: any, obj2: any, keys: string[]) => {
  return keys.every((key) => obj1[key] === obj2[key])
}
