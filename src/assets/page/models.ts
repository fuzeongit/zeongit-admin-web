import { Expose, Type } from "class-transformer"
import { IsInt, IsString } from "class-validator"
import { Default, ParseArray } from "../share/decorators/transform.decorator"

export class Pageable {
  @Type(() => Number)
  @Default(1)
  @IsInt()
  @Expose({ name: "page" })
  page: number
  @Type(() => Number)
  @Default(5)
  @IsInt()
  @Expose({ name: "limit" })
  limit: number
  @Type(() => String)
  @IsString({ each: true })
  @ParseArray("createDate,desc")
  @Expose({ name: "sort" })
  sort: string[]

  constructor(query?: Partial<Pageable>) {
    this.page = query?.page ?? 1
    this.limit = query?.limit ?? 5
    this.sort = query?.sort ?? []
  }
}
