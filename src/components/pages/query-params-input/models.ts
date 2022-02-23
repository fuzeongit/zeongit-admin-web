import { QueryParamsType } from "./constants"
import { SelectOption } from "naive-ui"

export class QueryParamsModel {
  constructor(
    public label: string,
    public type: QueryParamsType,
    // 占位符
    public placeholder: string = "",
    public options: Array<SelectOption> = []
  ) {}
}
