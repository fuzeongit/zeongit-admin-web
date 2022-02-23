import { Directive } from "vue"

/**
 * 指令
 * 使用该指令会在挂载时自动获取焦点
 * @author Zeongit
 */
export const focusDirective: Directive<HTMLElement> = {
  mounted(el) {
    el.focus()
  }
}
