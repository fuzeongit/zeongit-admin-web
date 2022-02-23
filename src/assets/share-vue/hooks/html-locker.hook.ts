import { ComputedRef, watchEffect } from "vue"

/**
 * 钩子
 * 是否将html锁定滚动
 * @author Zeongit
 * @param visible 是否显示的计算属性
 */
export const useHtmlLocker = (visible: ComputedRef<boolean>) => {
  watchEffect(() => {
    const html = document.documentElement
    if (visible.value) {
      html.style.overflowY = "hidden"
    } else {
      html.style.overflowY = ""
      html.style.paddingRight = ""
    }
  })
}
