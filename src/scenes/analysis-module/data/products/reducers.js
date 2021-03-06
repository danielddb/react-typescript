import { ACTION_TYPES } from './actions'

const initialState = {
  loading: false,
  products: []
}

export function reducer(state = initialState, action) {
  switch(action.type) {
    case ACTION_TYPES.getProducts:
      return { ...state, loading: true }

    case ACTION_TYPES.getProductsSuccess:
      return {
        ...state,
        loading: false,
        products: action.payload.products
      }

    case ACTION_TYPES.getProductsFail:
      return {
        ...state,
        loading: false
      }
  }
}
