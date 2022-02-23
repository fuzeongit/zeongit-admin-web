import { Directive } from "vue"

/**
 * 交叉观测者指令
 * 在元素挂载的时候自动添加交叉观测者
 * @author Zeongit
 * modifiers：修饰可选值{"once","quiet"}，once:只触发一次，quiet:不触发事件
 * value：接收值为对象，包含交叉观测者的配置和事件
 */
export const intersectDirective: Directive = {
  mounted(el, binding) {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return

    const modifiers = binding.modifiers || {}
    const value = binding.value
    const { handler, options } =
      typeof value === "object" ? value : { handler: value, options: {} }
    const observer = new IntersectionObserver(
      (
        entries: IntersectionObserverEntry[] = [],
        observer: IntersectionObserver
      ) => {
        /* istanbul ignore if */
        if (!el._observe) return // Just in case, should never fire

        const isIntersecting = entries.some((entry) => entry.isIntersecting)

        // If is not quiet or has already been
        // initted, invoke the user callback
        if (
          handler &&
          (!modifiers.quiet || el._observe.init) &&
          (!modifiers.once || isIntersecting || !el._observe.init)
        ) {
          handler(entries, observer, isIntersecting)
        }

        if (isIntersecting && modifiers.once) {
          /* istanbul ignore if */
          if (!el._observe) return

          el._observe.observer.unobserve(el)
          delete el._observe
        } else el._observe.init = true
      },
      options
    )

    el._observe = { init: false, observer }

    observer.observe(el)
  },
  beforeUnmount(el) {
    /* istanbul ignore if */
    if (!el._observe) return

    el._observe.observer.unobserve(el)
    delete el._observe
  }
}
