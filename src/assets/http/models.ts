import { HttpStatus } from "./constants"
import { ExceptionResponse } from "./exception-response.model"

export class Result<T> {
  constructor(
    public status: HttpStatus,
    public message: string | undefined,
    public data: T,
    public exception?: ExceptionResponse
  ) {}
}
