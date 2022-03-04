import { Pageable } from "@/assets/page/models"
import { ParseDateRange } from "@/assets/share/decorators/transform.decorator"
import { IsDateRange } from "@/assets/share/decorators/validator-decorator"
import { Expose, Type } from "class-transformer"
import { IsEnum, IsInt, IsOptional } from "class-validator"
import { CouponType } from "../dictionaries/coupon-type.dictionary"
import { UseState } from "../dictionaries/use-state.dictionaries"

export class CouponRuleDto {
  constructor(
    public critical: number = 0,
    public reduce: number = 0,
    public discount: number = 10
  ) {}
}

export class CouponDto {
  constructor(
    public customerId: number = 0,
    public type: CouponType = CouponType.Reduce,
    public startDate: Date = new Date(),
    public endDate?: Date,
    public rule: CouponRuleDto = new CouponRuleDto()
  ) {}
}

export class QueryParams extends Pageable {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Expose({ name: "customerId" })
  customerId?: number

  @IsEnum(CouponType)
  @Type(() => Number)
  @IsOptional()
  @Expose({ name: "type" })
  type?: CouponType

  @IsDateRange()
  @ParseDateRange()
  @Expose({ name: "startDate" })
  startDate!: Array<Date | undefined>

  @IsDateRange()
  @ParseDateRange()
  @Expose({ name: "endDate" })
  endDate!: Array<Date | undefined>

  @IsEnum(UseState)
  @Type(() => Number)
  @IsOptional()
  @Expose({ name: "useState" })
  useState?: UseState
}
