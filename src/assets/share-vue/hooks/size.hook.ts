import { animationFrameScheduler, Observable, observeOn } from "rxjs"
import { Ref, ref, watchEffect } from "vue"

interface State {
  width: number
  height: number
}
/**
 * 钩子
 * 获取目标元素的宽高
 * @author Zeongit
 * @param element 目标元素
 * @returns
 */
export const useSize = <T extends HTMLElement>(element: Ref<T | undefined>) => {
  const state = ref({
    width: element.value?.clientWidth ?? 0,
    height: element.value?.clientHeight ?? 0
  })
  const resize$ = ref<Observable<State>>()

  watchEffect(() => {
    if (!element.value) return

    resize$.value = new Observable<State>((observer) => {
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          observer.next({
            width: entry.target.clientWidth,
            height: entry.target.clientHeight
          })
        })
      })
      resizeObserver.observe(element.value as T)
      observer.unsubscribe = () => {
        resizeObserver.disconnect()
      }
    }).pipe(observeOn(animationFrameScheduler))
  })

  watchEffect(() => {
    const subscription = resize$.value?.subscribe((value) => {
      state.value = value
    })
    return () => {
      subscription?.unsubscribe()
    }
  })

  return { state, resize$ }
}
