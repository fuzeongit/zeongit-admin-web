import { Base } from "../../base/vos/base.vo"
import { UseState } from "../dictionaries/use-state.dictionaries";

export interface Category extends Base {
  name: string
  useState: UseState
}
