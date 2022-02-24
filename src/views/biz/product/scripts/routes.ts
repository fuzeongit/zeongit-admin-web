import { MENU_KEYS } from "@/assets/modules/base/constants/menu-key.constant"
import { RouteRecordRaw } from "vue-router"

export const productRoutes: Array<RouteRecordRaw> = [
  {
    path: "/biz/product",
    props: true,
    meta: {
      menuKey: MENU_KEYS.BIZ_PRODUCT
    },
    component: () => import("../index.vue")
  },
  {
    path: "/biz/product/edit/:id?",
    props: true,
    meta: {
      menuKey: MENU_KEYS.BIZ_PRODUCT
    },
    component: () => import("../edit.vue")
  }
]
