import { interval, take } from "rxjs"
import type { Ref } from "vue"

/**
 * 钩子
 * 倒数计时
 * @author Zeongit
 * @param ms 毫秒数
 * @param wait 每次回调间隔
 * @param callback 回调函数
 */
export const useCountdown = (
  ms: Ref<number>,
  wait = 1000,
  callback?: () => void
) => {
  return interval(wait)
    .pipe(take(Math.ceil(ms.value / wait)))
    .subscribe({
      next: (i) => (ms.value -= wait),
      complete: callback
    })
}
