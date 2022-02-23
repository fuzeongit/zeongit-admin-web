import { RouteRecordRaw } from "vue-router"

export const roleRoutes: Array<RouteRecordRaw> = [
  {
    path: "/system/role",
    props: true,
    component: () => import("./index.vue")
  }
]
