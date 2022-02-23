import { Base } from "../../base/vos/base.vo"
import { SellingState } from "../dictionaries/selling-state.dictionaries"
import { UseState } from "../dictionaries/use-state.dictionaries"
import { Sku } from "../dtos/product.dto"
import { ProductAttr } from "./product-attr.vo"
import { ProductCategory } from "./product-category.vo"

export interface Product extends Base {
  title: string
  mainImage: string
  images: string[]
  detail: string[]
  minPrice: number
  maxPrice: number
  useState: UseState
  sellingState: SellingState
  attrList: ProductAttr[]
  skuList: Sku[]
  categoryList: ProductCategory[]
}
