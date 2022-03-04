import { CustomerBase } from "../../base/vos/customer-base.vo"
import { CouponState } from "../dictionaries/coupon-state.dictionary"
import { CouponType } from "../dictionaries/coupon-type.dictionary"
import { OrderState } from "../dictionaries/order-state.dictionary"
export interface Order extends CustomerBase {
  state: OrderState
  sourceAmount: number
  amount: number

  skuList: OrderSku[]

  coupon?: OrderCoupon
}

export interface OrderSku extends CustomerBase {
  orderId: number
  productId: number
  skuId: number
  title: string
  mainImage: string
  images: string
  detail: string
  code: string
  spec: string
  price: number
  count: number
}

export interface OrderCoupon extends CustomerBase {
  orderId: number
  couponId: number
  type: CouponType
  rule: string
  startDate: Date
  endDate?: Date
  state: CouponState
}
