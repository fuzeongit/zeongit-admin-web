import { MENU_KEYS } from "@/assets/modules/base/constants/menu-key.constant"
import { RouteRecordRaw } from "vue-router"

export const categoryRoutes: Array<RouteRecordRaw> = [
  {
    path: "/biz/category",
    props: true,
    meta: {
      menuKey: MENU_KEYS.BIZ_CATEGORY
    },
    component: () => import("../index.vue")
  }
]
