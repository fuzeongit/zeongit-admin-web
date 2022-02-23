import "reflect-metadata"
import type { Component } from "vue"
import { createApp } from "vue"
import App from "./app.vue"
import { clickOutsideDirective } from "./assets/share-vue/directives/click-outside.directive"
import { focusDirective } from "./assets/share-vue/directives/focus.directive"
import { intersectDirective } from "./assets/share-vue/directives/intersect.directive"
import { lazyDirective } from "./assets/share-vue/directives/lazy.directive"
import "./index.scss"
import router from "./router"
const app = createApp(App as unknown as Component)
  .use(router)
  .directive("intersect", intersectDirective)
  .directive("lazy", lazyDirective)
  .directive("focus", focusDirective)
  .directive("click-outside", clickOutsideDirective)

const meta = document.createElement("meta")
meta.name = "naive-ui-style"
document.head.appendChild(meta)

app.mount("#app")
