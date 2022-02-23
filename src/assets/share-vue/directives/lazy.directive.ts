import { Directive } from "vue"

/**
 * 懒加载的指令
 * @author Zeongit
 *
 */
export const lazyDirective: Directive<HTMLImageElement, string> = {
  mounted(el, binding) {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return

    const modifiers = binding.modifiers || {}
    const value = binding.value as string
    const observer = new IntersectionObserver((entries) => {
      // @ts-ignore
      if (!el._lazy) return

      const isIntersecting = entries.some((entry) => entry.isIntersecting)

      if (isIntersecting) {
        el.src = value
        // @ts-ignore
        if (!el._lazy) return
        // @ts-ignore
        el._lazy.observer.unobserve(el)
        // @ts-ignore
        delete el._lazy
      }
    })
    // @ts-ignore
    el._lazy = { observer }

    observer.observe(el)
  },
  beforeUnmount(el) {
    // @ts-ignore
    if (!el._lazy) return
    // @ts-ignore
    el._lazy.observer.unobserve(el)
    // @ts-ignore
    delete el._lazy
  }
}
