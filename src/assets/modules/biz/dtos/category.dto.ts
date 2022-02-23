import { Pageable } from "@/assets/page/models"
import {
  ParseDateRange
} from "@/assets/share/decorators/transform.decorator"
import { IsDateRange } from "@/assets/share/decorators/validator-decorator"
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
