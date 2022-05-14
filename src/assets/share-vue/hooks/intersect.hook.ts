import { computed, readonly, Ref, ref } from "@vue/reactivity"
import { animationFrameScheduler, Observable, observeOn } from "rxjs"
import { onMounted, watchEffect } from "vue"

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

  const intersection$ = ref<Observable<IntersectionObserverEntry[]>>()

  const isIntersecting = computed(() =>
    entries.value.some((item) => item.isIntersecting)
  )

  onMounted
  watchEffect(() => {
    if (!element.value) return
    intersection$.value = new Observable<IntersectionObserverEntry[]>(
      (observer) => {
        const intersectionObserver = new IntersectionObserver((entries) => {
          observer.next(entries)
        }, options)
        intersectionObserver.observe(element.value as T)
        observer.unsubscribe = () => {
          intersectionObserver.disconnect()
        }
      }
    ).pipe(observeOn(animationFrameScheduler))
  })

  watchEffect(() => {
    const subscription = intersection$.value?.subscribe((value) => {
      entries.value = value
    })
    return () => {
      subscription?.unsubscribe()
    }
  })

  return { entries, isIntersecting, intersection$ }
}
