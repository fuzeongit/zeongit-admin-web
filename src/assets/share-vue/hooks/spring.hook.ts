import type { AnimationOptions } from "popmotion"
import { animate } from "popmotion"
import { Observable, Subject, switchMap } from "rxjs"
import { ref } from "vue"

/**
 * 钩子
 * @author Zeongit
 */
export const useSpring = <T>(
  defaultValue: T,
  options?: AnimationOptions<T>
) => {
  const state = ref(defaultValue)

  const set = (target: T) =>
    new Observable<T>((subscriber) => {
      // @ts-ignore
      animate<T>({
        from: state.value as T,
        to: target,
        ...(options ?? {}),
        onUpdate: (v) => {
          subscriber.next(v)
        }
      })
    })

  const subject$ = new Subject<T>()

  const subscription$ = subject$
    .pipe(switchMap((target: T) => set(target)))
    .subscribe((v) => {
      ;(state.value as T) = v as T
    })
  return {
    state,
    subject$,
    subscription$
  }
}
