import { IsDateRange, ParseDateRange } from "@zeongit/share-ts/transforms"
import { Pageable } from "@zeongit/share-nest-vue/page"
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
