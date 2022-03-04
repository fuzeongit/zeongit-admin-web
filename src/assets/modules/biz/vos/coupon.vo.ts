import { CustomerBase } from "../../base/vos/customer-base.vo"
import { CouponType } from "../dictionaries/coupon-type.dictionary"
import { UseState } from "./../dictionaries/use-state.dictionaries"

export interface CouponRule {
  critical: number

  reduce: number

  discount: number
}

export interface Coupon extends CustomerBase {
  type: CouponType

  startDate: Date

  endDate?: Date

  useState: UseState

  rule: CouponRule
}
