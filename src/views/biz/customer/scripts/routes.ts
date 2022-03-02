import { MENU_KEYS } from "@/assets/modules/base/constants/menu-key.constant"
import { RouteRecordRaw } from "vue-router"

export const customerRoutes: Array<RouteRecordRaw> = [
  {
    path: "/biz/customer",
    props: true,
    meta: {
      menuKey: MENU_KEYS.BIZ_CUSTOMER
    },
    component: () => import("../index.vue")
  },
  {
    path: "/biz/coupon/:customerId",
    props: true,
    meta: {
      menuKey: MENU_KEYS.BIZ_CUSTOMER
    },
    component: () => import("../coupon.vue")
  }
]
