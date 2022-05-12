import { Result } from "@zeongit/share-nest-vue/http"
import { Pagination } from "@zeongit/share-nest-vue/page"
import { QueryParams } from "../dtos/customer.dto"
import { Customer } from "../vos/customer.vo"
import { fetchService } from "./fetch.service"

export const customerService = {
  paging(queryParams: QueryParams): Promise<Result<Pagination<Customer>>> {
    return fetchService.get("/biz/customer/paging", { params: queryParams })
  },
  frozen(id: number): Promise<Result<Boolean>> {
    return fetchService.post("/biz/customer/frozen", { id })
  },
  thaw(id: number): Promise<Result<Boolean>> {
    return fetchService.post("/biz/customer/thaw", { id })
  }
}
