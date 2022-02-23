import { readonly, Ref, ref, watch } from "vue"

/**
 * 钩子
 * 获取元素的交叉观测者实体
 * @author Zeongit
 * @param element 目标元素
 * @param options 交叉观测者的配置
 * @returns
 */
export const useIntersect = <T extends HTMLElement>(
  element: Ref<T | undefined>,
  options?: IntersectionObserverInit
) => {
  const entries = ref<IntersectionObserverEntry[]>([])
  const intersectionObserver = ref<IntersectionObserver>()
  watch(element, (n) => {
    intersectionObserver.value?.disconnect()
    if (!n) return
    intersectionObserver.value = new IntersectionObserver((_entries) => {
      entries.value = _entries as []
    }, options)
    intersectionObserver.value!.observe(n as T)
  })
  return {
    entries: readonly(entries),
    intersectionObserver: readonly(intersectionObserver)
  }
}
