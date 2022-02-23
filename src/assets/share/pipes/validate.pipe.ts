import { validate, validateSync } from "class-validator"
import { defer, map, tap } from "rxjs"

export const validatePipe = <T extends object>(value: T) =>
  defer(() => validate(value)).pipe(
    tap((errors) => {
      if (errors.length > 0) {
        throw errors
      }
    }),
    map(() => value)
  )

export const validateSyncPipe = <T extends object>(value: T) => {
  const errors = validateSync(value)
  if (errors.length > 0) {
    throw errors
  }
  return value
}
