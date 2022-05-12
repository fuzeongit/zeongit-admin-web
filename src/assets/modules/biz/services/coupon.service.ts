import { Result } from "@zeongit/share-nest-vue/http"
import { Pagination } from "@zeongit/share-nest-vue/page"
import { CouponDto, QueryParams } from "../dtos/coupon.dto"
import { Coupon } from "../vos/coupon.vo"
import { fetchService } from "./fetch.service"

export const couponService = {
  paging(queryParams: QueryParams): Promise<Result<Pagination<Coupon>>> {
    return fetchService.get("/biz/coupon/paging", { params: queryParams })
  },
  save(dto: CouponDto): Promise<Result<Coupon>> {
    return fetchService.post("/biz/coupon/save", dto)
  },
  get(id: number): Promise<Result<Coupon>> {
    return fetchService.get("/biz/coupon/get", { params: { id } })
  },
  delete(id: number): Promise<Result<void>> {
    return fetchService.post("/biz/coupon/delete", { id })
  }
}
