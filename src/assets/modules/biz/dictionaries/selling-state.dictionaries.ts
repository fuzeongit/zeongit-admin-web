export enum SellingState {
  Not,
  In
}

export const SellingStateDictionary = {
  [SellingState.Not]: "未上架",
  [SellingState.In]: "已上架"
}

export const HandleSellingStateDictionary = {
  [SellingState.Not]: "上架",
  [SellingState.In]: "下架"
}

export const HandleSellingStateMessageDictionary = {
  [SellingState.Not]: "上架后商品下所有Sku将同时上架并允许下单购买，确定上架吗？",
  [SellingState.In]: "下架架后商品下所有Sku将同时上架并不再允许下单购买，确定下架吗？"
}


