import { Result } from "@zeongit/share-nest-vue/http"
import { Pagination } from "@zeongit/share-nest-vue/page"
import { QueryParams, SaveDto } from "../dtos/product.dto"
import { Product } from "../vos/product.vo"
import { fetchService } from "./fetch.service"

export const productService = {
  create(dto: SaveDto): Promise<Result<Product>> {
    return fetchService.post("/biz/product/create", dto)
  },
  update(id: number, dto: SaveDto): Promise<Result<Product>> {
    return fetchService.post("/biz/product/update", { ...dto, id })
  },
  paging(queryParams: QueryParams): Promise<Result<Pagination<Product>>> {
    return fetchService.get("/biz/product/paging", { params: queryParams })
  },
  get(id: number): Promise<Result<Product>> {
    return fetchService.get("/biz/product/get", { params: { id } })
  },
  push(idList: number[]): Promise<Result<boolean>> {
    return fetchService.post("/biz/product/push", { idList })
  },
  pull(idList: number[]): Promise<Result<boolean>> {
    return fetchService.post("/biz/product/pull", { idList })
  }
}
