import { Result } from "@/assets/http/models"
import { Pagination } from "@/assets/page/vos"
import { QueryParams, SaveDto } from "../dtos/product.dto"
import { Product } from "../vos/product.vo"
import { fetchService } from "./fetch.service"

export const productService = {
  create(dto: SaveDto): Promise<Result<Product>> {
    return fetchService.post("/biz/product/create", dto)
  },
  paging(queryParams: QueryParams): Promise<Result<Pagination<Product>>> {
    return fetchService.get("/biz/product/paging", { params: queryParams })
  },
  get(id: number): Promise<Result<Product>> {
    return fetchService.get("/biz/product/get", { params: { id } })
  }
}
