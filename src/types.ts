import type { TDictClass } from "./utilities"

export interface IResult {
    path: string
    filename: string
    class: string | number
    date: Date | string
}


export interface IAllResults {
    results: IResult[]
    totalCounts: number
    countsByCategories: Record<TDictClass, number>
}