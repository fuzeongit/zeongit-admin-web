export enum CouponType {
  Reduce,
  Discount
}

export const CouponTypeDictionary = {
  [CouponType.Reduce]: "满减券",
  [CouponType.Discount]: "折扣券"
}
