import { Base } from "../../base/vos/base.vo"
import { FrozenState } from "../dictionaries/frozen-state.dictionary";

export interface Customer extends Base {
  nickname: string
  birthday?: Date
  avatar?: string
  frozenState: FrozenState
}
