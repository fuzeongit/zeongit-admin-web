import { FetchClient } from "@zeongit/share-nest-vue/http"
import { localGet } from "@zeongit/share-ts"
import { AUTHORIZATION } from "../../base/constants/storage-key.constant"

export const fetchService = new FetchClient(import.meta.env.VITE_API_HOST, {
  headersFactory: () =>
    new Headers({
      "content-type": "application/json;charset=utf-8",
      authorization: localGet(AUTHORIZATION)
    })
})
