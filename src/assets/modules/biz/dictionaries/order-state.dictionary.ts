export enum OrderState {
  // 待支付
  WaitPay,
  // 待发货
  WaitDeliver,
  // 待收货
  Delivered,
  // 已完成
  Finish,
  // 已取消
  Cancel
}


export const OrderStateDictionary = {
  [OrderState.WaitPay]: "待支付",
  [OrderState.WaitDeliver]: "待发货",
  [OrderState.Delivered]: "待收货",
  [OrderState.Finish]: "已完成",
  [OrderState.Cancel]: "已取消",
}