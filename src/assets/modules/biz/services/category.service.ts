import { Result } from "@/assets/http/models"
import { Pagination } from "@/assets/page/vos"
import { QueryParams, SaveDto } from "../dtos/category.dto"
import { Category } from "../vos/category.vo"
import { fetchService } from "./fetch.service"

export const categoryService = {
  paging(queryParams: QueryParams): Promise<Result<Pagination<Category>>> {
    return fetchService.get("/biz/category/paging", { params: queryParams })
  },
  list(queryParams?: QueryParams): Promise<Result<Array<Category>>> {
    return fetchService.get("/biz/category/list", {
      params: { ...queryParams, sort: "createDate,desc" }
    })
  },
  save(dto: SaveDto): Promise<Result<Category>> {
    return fetchService.post("/biz/category/save", dto)
  },
  get(id: number): Promise<Result<Category>> {
    return fetchService.get("/biz/category/get", { params: { id } })
  }
}
