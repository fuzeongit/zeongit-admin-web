import { FetchClient } from "@/assets/http/services"
import { localGet } from "@/assets/share/utils/window/storage.util"
import { AUTHORIZATION } from "../../base/constants/storage-key.constant"

export const fetchService = new FetchClient(import.meta.env.VITE_API_HOST, {
  headersFactory: () =>
    new Headers({
      "content-type": "application/json;charset=utf-8",
      authorization: localGet(AUTHORIZATION)
    })
})
