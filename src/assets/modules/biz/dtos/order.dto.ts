import { IsDateRange, ParseDateRange } from "@zeongit/share-ts/transforms"
import { Pageable } from "@zeongit/share-nest-vue/page"
import { Expose, Type } from "class-transformer"
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator"
import { OrderState } from "../dictionaries/order-state.dictionary"
export class QueryParams extends Pageable {
  @IsInt()
  @IsOptional()
  customerId?: number

  @IsInt()
  @IsOptional()
  productId?: number

  @IsString()
  @IsOptional()
  title?: string

  @IsEnum(OrderState)
  @Type(() => Number)
  @IsOptional()
  state?: Date

  @IsDateRange()
  @ParseDateRange()
  @Expose({ name: "createDate" })
  createDate!: Array<Date | undefined>
}
