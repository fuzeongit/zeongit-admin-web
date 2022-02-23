import { readonly, Ref, ref, watchEffect } from "vue"

/**
 * 钩子
 * 获取目标元素的宽高
 * @author Zeongit
 * @param element 目标元素
 * @returns
 */
export const useSize = <T extends HTMLElement>(
  element: Ref<T | undefined>
) => {
  const state = ref({
    width: element.value?.clientWidth ?? 0,
    height: element.value?.clientHeight ?? 0
  })
  const resizeObserver = ref<ResizeObserver | undefined>()
  watchEffect(() => {
    resizeObserver.value?.disconnect()
    if (!element.value) return
    resizeObserver.value = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        state.value = {
          width: entry.target.clientWidth,
          height: entry.target.clientHeight
        }
      })
    })
    resizeObserver.value!.observe(element.value as unknown as T)
  })
  return { state: readonly(state), resizeObserver: readonly(resizeObserver) }
}
