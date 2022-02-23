import { inject, reactive, readonly } from "vue"

interface State {}

const symbol = Symbol("fragment")

const createStore = () => {
  const state = reactive<State>({})
  const mutations = {}
  const actions = {}
  return { state: readonly(state), mutations, actions }
}

export const useFragmentStore = () =>
  inject<ReturnType<typeof createStore>>(symbol)
