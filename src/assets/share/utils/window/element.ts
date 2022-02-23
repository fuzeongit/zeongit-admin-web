/**
 * 判断元素是否聚焦
 * @param el 元素
 * @returns
 */
const isFocused = (el: HTMLElement) => {
  return el === document.activeElement || el.contains(document.activeElement)
}
