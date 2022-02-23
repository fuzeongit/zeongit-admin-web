import { RouteRecordRaw } from "vue-router"
import { roleRoutes } from "./role/routes"

export const systemRoutes: Array<RouteRecordRaw> = [...roleRoutes]
