import { from } from "rxjs"
import { ref, Ref } from "vue"

/**
 * 钩子
 * 可取消的promise请求，异步操作，等到promise结束后自动设值
 * @author Zeongit
 * @param promise 异步promise
 * @param refProp 外部传入的ref对象
 * @returns
 */
export const usePromise = <T>(
  promise: Promise<T>,
  refProp?: Ref<T | undefined>
) => {
  const result = ref<T>()
  const observable = from(promise)

  const subscription$ = observable.subscribe((val) => {
    if (refProp) {
      refProp.value = val
    }
    result.value = val
  })

  return {
    result,
    subscription$
  }
}
