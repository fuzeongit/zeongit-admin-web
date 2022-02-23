import { Base } from "../../base/vos/base.vo"
import { ProductValueAttr } from "./product-attr-value.vo";

export interface ProductAttr extends Base {
  productId: number
  name: string
  valueList: ProductValueAttr[]
}
