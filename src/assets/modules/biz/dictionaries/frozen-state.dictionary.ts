export enum FrozenState {
  Normal,
  Frozen
}

export const FrozenStateDictionary = {
  [FrozenState.Normal]: "正常",
  [FrozenState.Frozen]: "已冻结"
}

export const HandleFrozenStateDictionary = {
  [FrozenState.Normal]: "冻结",
  [FrozenState.Frozen]: "解冻"
}

export const HandleFrozenStateMessageDictionary = {
  [FrozenState.Normal]: "冻结",
  [FrozenState.Frozen]: "解冻"
}
