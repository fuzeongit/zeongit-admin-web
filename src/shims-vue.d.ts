declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "*.svg?component" {
  import { ComputedOptions, DefineComponent, MethodOptions } from "vue"
  const src: DefineComponent<any, any, any, ComputedOptions, MethodOptions>
  export default src
}
