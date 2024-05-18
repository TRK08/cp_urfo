import type { IAllResults, IResult } from '@/types'
import type { TDictClass } from '@/utilities'
import axios from 'axios'
import { defineStore } from 'pinia'


interface IState {
  fetchStatus: 'init' | 'loading'
  results: IResult[]
  totalCounts: number
  countsByCategories: Record<TDictClass, number>
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useResultsStore = defineStore('results', {
  state: (): IState => {
    return {
      fetchStatus: 'init',
      totalCounts: 0,
      countsByCategories: {} as IState['countsByCategories'],
      results: []
      // results: [
      //   {
      //     path: 'https://media.istockphoto.com/id/140157656/photo/majestic-red-stag-in-yellowing-autumn-meadow.jpg?s=612x612&w=0&k=20&c=HTZekU4jjsPBvTDAZOkX13Vklb0hPehuuIcL1ZgfXkQ=',
      //     filename: 'dsa',
      //     class: 0,
      //     date: new Date()
      //   },
      //   {
      //     path: 'https://media.istockphoto.com/id/140157656/photo/majestic-red-stag-in-yellowing-autumn-meadow.jpg?s=612x612&w=0&k=20&c=HTZekU4jjsPBvTDAZOkX13Vklb0hPehuuIcL1ZgfXkQ=',
      //     filename: 'asd',
      //     class: 0,
      //     date: new Date()
      //   },
      //   {
      //     path: 'https://media.istockphoto.com/id/140157656/photo/majestic-red-stag-in-yellowing-autumn-meadow.jpg?s=612x612&w=0&k=20&c=HTZekU4jjsPBvTDAZOkX13Vklb0hPehuuIcL1ZgfXkQ=',
      //     filename: 'dsa',
      //     class: 0,
      //     date: new Date()
      //   },
      //   {
      //     path: 'https://media.istockphoto.com/id/140157656/photo/majestic-red-stag-in-yellowing-autumn-meadow.jpg?s=612x612&w=0&k=20&c=HTZekU4jjsPBvTDAZOkX13Vklb0hPehuuIcL1ZgfXkQ=',
      //     filename: 'asd',
      //     class: 1,
      //     date: new Date()
      //   },
      //   {
      //     path: 'https://media.istockphoto.com/id/140157656/photo/majestic-red-stag-in-yellowing-autumn-meadow.jpg?s=612x612&w=0&k=20&c=HTZekU4jjsPBvTDAZOkX13Vklb0hPehuuIcL1ZgfXkQ=',
      //     filename: 'dsa',
      //     class: 1,
      //     date: new Date()
      //   },
      //   {
      //     path: 'https://media.istockphoto.com/id/140157656/photo/majestic-red-stag-in-yellowing-autumn-meadow.jpg?s=612x612&w=0&k=20&c=HTZekU4jjsPBvTDAZOkX13Vklb0hPehuuIcL1ZgfXkQ=',
      //     filename: 'asd',
      //     class: 0,
      //     date: new Date()
      //   },
      //   {
      //     path: 'https://media.istockphoto.com/id/140157656/photo/majestic-red-stag-in-yellowing-autumn-meadow.jpg?s=612x612&w=0&k=20&c=HTZekU4jjsPBvTDAZOkX13Vklb0hPehuuIcL1ZgfXkQ=',
      //     filename: 'dsa',
      //     class: 2,
      //     date: new Date()
      //   },
      //   {
      //     path: 'https://media.istockphoto.com/id/140157656/photo/majestic-red-stag-in-yellowing-autumn-meadow.jpg?s=612x612&w=0&k=20&c=HTZekU4jjsPBvTDAZOkX13Vklb0hPehuuIcL1ZgfXkQ=',
      //     filename: 'asd',
      //     class: 2,
      //     date: new Date()
      //   }
      // ]
    }
  },
  actions: {
    async fetchAll() {
      this.fetchStatus = 'loading'

      try {
        const { data } = await axios.get<IAllResults>(`${baseUrl}/all`)

        if (data) {
          this.results = data.results
          this.totalCounts = data.totalCounts
          this.countsByCategories = data.countsByCategories
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.fetchStatus = 'init'
      }
    }
  },
  getters: {}
})
