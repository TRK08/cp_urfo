import { defineStore } from 'pinia'


interface IState {
  fetchStatus: 'init' | 'loading' | 'success' | 'error'
  results: any[]
}

export const useResultsStore = defineStore('results', {
  state: (): IState => {
    return {
      fetchStatus: 'init',
      results: []
    }
  },
  actions: {},
  getters: {}
})
