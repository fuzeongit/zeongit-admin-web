import { IsDateRange, ParseDateRange } from "@zeongit/share-ts/transforms"
import { Pageable } from "@zeongit/share-nest-vue/page"
import { Expose, Type } from "class-transformer"
import { IsEnum, IsOptional, IsString } from "class-validator"
import { UseState } from "../dictionaries/use-state.dictionaries"

export class QueryParams extends Pageable {
  @IsString()
  @IsOptional()
  @Expose({ name: "name" })
  name?: string

  @IsDateRange()
  @ParseDateRange()
  @Expose({ name: "createDate" })
  createDate!: Array<Date | undefined>

  // @IsEnum(UseState, { each: true })
  // @Type(() => Number)
  // @IsOptional()
  // @ParseArray()
  // @Expose({ name: "useState" })
  // useState?: UseState[]

  @IsEnum(UseState)
  @Type(() => Number)
  @IsOptional()
  @Expose({ name: "useState" })
  useState?: UseState
}

export class SaveDto {
  constructor(public name: string = "", public id?: number) {}
}
