import { Base } from "../../base/vos/base.vo"
import { CouponType } from "../dictionaries/coupon-type.dictionary"
import { UseState } from "./../dictionaries/use-state.dictionaries"

export interface CouponRule {
  critical: number

  reduce: number

  discount: number
}

export interface Coupon extends Base {
  customerId: number

  couponType: CouponType

  startDate: Date

  endDate?: Date

  useState: UseState

  rule: CouponRule
}
