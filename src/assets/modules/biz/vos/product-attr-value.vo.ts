import { Base } from "../../base/vos/base.vo"

export interface ProductValueAttr extends Base {
  productId: number
  productAttrId: number
  name: string
  code: string
}
