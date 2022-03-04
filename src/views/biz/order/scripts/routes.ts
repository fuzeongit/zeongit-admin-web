import { MENU_KEYS } from "@/assets/modules/base/constants/menu-key.constant"
import { RouteRecordRaw } from "vue-router"

export const orderRoutes: Array<RouteRecordRaw> = [
  {
    path: "/biz/order",
    props: true,
    meta: {
      menuKey: MENU_KEYS.BIZ_ORDER
    },
    component: () => import("../index.vue")
  }
]
