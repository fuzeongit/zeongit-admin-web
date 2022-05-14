import { Result } from "@zeongit/share-nest-vue/http"
import { SelectOption } from "naive-ui"
import { QueryParamsModel } from "./models"

type Option<T> = {
  listSource: () => Promise<Result<T[]>>
  pipe: (data: T[]) => SelectOption[]
}

export const useFillOptions = <T>(
  queryParamsModel: Record<string, QueryParamsModel>,
  options: Record<string, Option<T>>
) => {
  Object.keys(options).forEach((key) => {
    const { listSource, pipe } = options[key]
    listSource().then(({ data }) => {
      queryParamsModel[key].options = pipe(data)
    })
  })
}
 