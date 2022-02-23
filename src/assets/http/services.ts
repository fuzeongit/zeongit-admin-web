import { catchError, map, Observable, of, switchMap } from "rxjs"
import { ajax } from "rxjs/ajax"
import { fromFetch } from "rxjs/fetch"
import {
  HttpClient,
  HttpClientOptions,
  RequestOptions
} from "./abstract/client"
import { HttpStatus } from "./constants"
import { Result } from "./models"

export class FetchObservableClient extends HttpClient<Observable<Result<any>>> {
  constructor(
    readonly host: string,
    readonly httpClientOptions: HttpClientOptions = {}
  ) {
    super(host, httpClientOptions)
  }

  fetch(url: string, options: RequestOptions = {}) {
    return fromFetch(
      this.host + url + this._getParamsString(options),
      Object.assign(options ?? {}, {
        headers: this._getHeaders(options?.headers ?? new Headers())
      })
    )
  }

  fetchPack(url: string, options: RequestOptions = {}) {
    return this.fetch(url, options).pipe(
      switchMap((response) => response.json() as Promise<Result<any>>),
      catchError((error) =>
        of(
          new Result(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Exception", error)
        )
      )
    )
  }
}

export class FetchClient extends HttpClient<Promise<Result<any>>> {
  constructor(
    readonly host: string,
    readonly httpClientOptions: HttpClientOptions = {}
  ) {
    super(host, httpClientOptions)
  }

  fetch(url: string, options: RequestOptions = {}) {
    return fetch(
      this.host + url + this._getParamsString(options),
      Object.assign(options ?? {}, {
        headers: this._getHeaders(options?.headers ?? new Headers())
      })
    )
  }

  async fetchPack(url: string, options: RequestOptions = {}) {
    try {
      const response = await this.fetch(url, options)
      return response.json() as Promise<Result<any>>
    } catch (error) {
      return new Result(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Internal Server Exception",
        error
      )
    }
  }
}

export class AjaxObservableClient extends HttpClient<Observable<Result<any>>> {
  constructor(
    readonly host: string,
    readonly httpClientOptions: HttpClientOptions = {}
  ) {
    super(host, httpClientOptions)
  }

  fetch(url: string, options: RequestOptions = {}) {
    return ajax(
      Object.assign(options ?? {}, {
        url: this.host + url + this._getParamsString(options),
        headers: this._getHeaders(options?.headers ?? new Headers())
      })
    )
  }

  fetchPack(url: string, options: RequestOptions = {}) {
    return this.fetch(url, options).pipe(
      map((response) => response.response as Result<any>),
      catchError((error) =>
        of(
          new Result(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Exception", error)
        )
      )
    )
  }
}
