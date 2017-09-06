import * as types from './action-types'

const initialState = {
  loading: false,
  products: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case types.GET_PRODUCTS:
      return { ...state, loading: true }

    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products
      }

    case types.GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
