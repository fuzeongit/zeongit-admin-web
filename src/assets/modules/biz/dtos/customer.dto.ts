import { Pageable } from "@/assets/page/models"
import { ParseDateRange } from "@/assets/share/decorators/transform.decorator"
import { IsDateRange } from "@/assets/share/decorators/validator-decorator"
import { Expose, Type } from "class-transformer"
import { IsEnum, IsOptional, IsString } from "class-validator"
import { FrozenState } from "../dictionaries/frozen-state.dictionary"

export class QueryParams extends Pageable {
  @IsString()
  @IsOptional()
  @Expose({ name: "nickname" })
  nickname?: string

  @IsDateRange()
  @ParseDateRange()
  @Expose({ name: "birthday" })
  birthday!: Array<Date | undefined>

  @IsDateRange()
  @ParseDateRange()
  @Expose({ name: "createDate" })
  createDate!: Array<Date | undefined>

  @IsEnum(FrozenState)
  @Type(() => Number)
  @IsOptional()
  frozenState?: FrozenState
}
