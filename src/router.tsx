import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { MENU_KEYS } from "./assets/modules/base/constants/menu-key.constant"
import { customerRoutes } from "./views/biz/customer/scripts/routes"
import { orderRoutes } from "./views/biz/order/scripts/routes"
import { bizRoutes } from "./views/biz/routes"
import { systemRoutes } from "./views/system/routes"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout:Main",
    props: true,
    component: () => import("@/components/layouts/main.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        props: true,
        meta: {
          menuKey: MENU_KEYS.HOME
        },
        component: () => import("@/views/index.vue")
      },
      ...systemRoutes,
      ...bizRoutes,
      ...customerRoutes,
      ...orderRoutes
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
