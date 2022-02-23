import { RouteRecordRaw } from "vue-router"

export const productRoutes: Array<RouteRecordRaw> = [
  {
    path: "/biz/product",
    props: true,
    component: () => import("../index.vue")
  },
  {
    path: "/biz/product/edit/:id?",
    props: true,
    component: () => import("../edit.vue")
  }
]
