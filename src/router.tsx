import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
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
        component: () => import("@/views/index.vue")
      },
      ...systemRoutes,
      ...bizRoutes
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
