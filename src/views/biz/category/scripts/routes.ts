import { RouteRecordRaw } from "vue-router"

export const categoryRoutes: Array<RouteRecordRaw> = [
  {
    path: "/biz/category",
    props: true,
    component: () => import("../index.vue")
  }
]
