import { HttpStatus, Result } from "@zeongit/share-nest-vue/http"
import { useNotification } from "naive-ui"

export const useFunction = () => {
  const notification = useNotification()
  return {
    checkResult(result: Result<unknown>) {
      if (result.status !== HttpStatus.OK) {
        notification.error({
          title: "异常",
          content: result.message,
          duration: 5000
        })
        throw new Error(result.message)
      }
    }
  }
}
