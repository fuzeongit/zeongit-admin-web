import { RouteRecordRaw } from "vue-router"
import { categoryRoutes } from "./category/scripts/routes"
import { productRoutes } from "./product/scripts/routes"

export const bizRoutes: Array<RouteRecordRaw> = [
  ...categoryRoutes,
  ...productRoutes
]
