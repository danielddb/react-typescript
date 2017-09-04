import { ACTION_TYPES } from './actions'

interface State {
  loading: boolean
  products: any[]
}

const initialState: State = {
  loading: false,
  products: []
}

export function reducer(state: State = initialState, action: any) {
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
