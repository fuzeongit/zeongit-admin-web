import { Base } from "../../base/vos/base.vo"

export interface ProductCategory extends Base {
  productId: number
  categoryId: number
  name: string
}
