import { Pageable } from "@/assets/page/models"
import {
  ParseArray,
  ParseDateRange,
  ParseDeserializeArray
} from "@/assets/share/decorators/transform.decorator"
import { IsDateRange } from "@/assets/share/decorators/validator-decorator"
import { Expose, Type } from "class-transformer"
import { IsInt, IsOptional, IsString } from "class-validator"

export class SaveDto {
  constructor(
    public title: string = "",
    public categoryIdList: number[] = [],
    public attrList: Attr[] = [],
    public skuList: Sku[] = [],
    public mainImage: string = "",
    public images: string[] = [],
    public detail: string[] = []
  ) {}
}

export class Attr {
  constructor(public name: string = "", public valueList: string[] = []) {}
}

export class Sku {
  id?: number
  @Type(() => Date)
  createDate?: Date
  @Type(() => Date)
  updateDate?: Date
  productId?: number
  specList: string[]
  constructor(
    public code: string = "",
    specList: string[] = [],
    public price: number = 0
  ) {
    this.specList = specList
  }
}

export class QueryParams extends Pageable {
  @IsString()
  @IsOptional()
  @Expose({ name: "name" })
  name?: string

  @IsDateRange()
  @ParseDateRange()
  @Expose({ name: "createDate" })
  createDate!: Array<Date | undefined>

  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  @ParseArray()
  @Expose({ name: "categoryIdList" })
  categoryIdList?: number[]
}
