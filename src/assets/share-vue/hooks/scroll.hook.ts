import { fromEvent, throttleTime } from "rxjs"
import { readonly, ref, Ref, watchEffect } from "vue"

/**
 * 钩子
 * 获取目标元素的滚动高度和宽度
 * @author Zeongit
 * @param element 目标元素
 * @returns
 */
export const useScroll = <T extends HTMLElement>(
  element: Ref<T | undefined>
) => {
  const state = ref({
    top: element.value?.scrollTop ?? 0,
    left: element.value?.scrollLeft ?? 0
  })
  const onScroll = () => {
    state.value = {
      top: element.value!.scrollTop,
      left: element.value!.scrollLeft
    }
  }

  watchEffect(() => {
    if (!element.value) return
    fromEvent(element.value, "scroll")
      .pipe(throttleTime(16))
      .subscribe(onScroll)
  })
  return { state: readonly(state), element }
}
