import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator"

@ValidatorConstraint({ name: "isDateRange", async: false })
class CustomDateRange implements ValidatorConstraintInterface {
  validate(
    text: Array<Date | string | number | undefined>,
    args: ValidationArguments
  ) {
    return text.every((it) => {
      ;(["string", "number"].includes(typeof it) &&
        !isNaN(new Date(it as string | number).getTime())) ||
        (it instanceof Date && !isNaN(it.getTime())) ||
        it === undefined
    })
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return "dateRange must be a date or undefined"
  }
}

export const IsDateRange = () => Validate(CustomDateRange)
