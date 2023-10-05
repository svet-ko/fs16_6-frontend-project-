import { AppState } from "../store"

export const getFiltered = (state: AppState, search?: string) => {
    return state.productReducer.products.filter(product => product.title.toLowerCase().includes(search?.toLowerCase()||''))
}