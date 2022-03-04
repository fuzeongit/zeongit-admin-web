import { Result } from "@/assets/http/models"
import { Pagination } from "@/assets/page/vos"
import { QueryParams } from "../dtos/order.dto"
import { Order } from "../vos/order.vo"
import { fetchService } from "./fetch.service"

export const orderService = {
  paging(queryParams: QueryParams): Promise<Result<Pagination<Order>>> {
    return fetchService.get("/biz/order/paging", { params: queryParams })
  },
  get(id: number): Promise<Result<Order>> {
    return fetchService.get("/biz/order/get", { params: { id } })
  }
}
