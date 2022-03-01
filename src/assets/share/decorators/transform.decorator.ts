import {
  ClassConstructor,
  deserialize,
  deserializeArray,
  Transform,
  TransformFnParams
} from "class-transformer"
import { parseSerializeTransformFn } from "../fragments/transform.function"
import { centToYuan, yuanToCent } from "../utils/money.util"

export const ParseArray = (defaultValue?: unknown) =>
  Transform(({ value }: TransformFnParams) => {
    if (Array.isArray(value)) {
      return value
    } else {
      if (value !== undefined) {
        return [value]
      } else {
        return defaultValue ? [defaultValue] : []
      }
    }
  })

export const ParseBoolean = () =>
  Transform(({ value }: TransformFnParams) => value === "true")

export const ParseDateRange = () =>
  Transform(({ value }: TransformFnParams) => {
    const dateRange: Array<string | undefined> = [undefined, undefined]
    if (Array.isArray(value)) {
      value
        .filter((it, i) => i < 2)
        .forEach((it, i) => {
          dateRange[i] = value[i] ? value[i] : undefined
        })
    } else {
      if (value !== undefined && value !== null && value !== "") {
        dateRange[0] = value
      }
    }
    return dateRange
  })

export const ParseEmptyString = () =>
  Transform(({ value }: TransformFnParams) =>
    value.length === 0 ? undefined : value
  )

export const ParseSerialize = () => Transform(parseSerializeTransformFn)

export const ParseDeserialize = () =>
  Transform(({ value }: TransformFnParams) => JSON.parse(value))

export const ParseCentToYuan = () =>
  Transform(({ value }: TransformFnParams) => centToYuan(value))

export const ParseYuanToCent = () =>
  Transform(({ value }: TransformFnParams) => yuanToCent(value))

export const Default = (defaultValue: unknown) => {
  return Transform(({ value }: TransformFnParams) => {
    return value ?? defaultValue
  })
}
