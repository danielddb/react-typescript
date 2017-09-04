import * as api from './api'

export const ACTION_TYPES = {
  getProducts: 'GET_PRODUCTS',
  getProductsSuccess: 'GET_PRODUCTS_SUCCESS',
  getProductsFail: 'GET_PRODUCTS_FAIL'
}

export function getProducts() {
  return async (dispatch: any) => {
    dispatch({ type: ACTION_TYPES.getProducts })

    try {
      const products = await api.getProducts()

      dispatch({ type: ACTION_TYPES.getProductsSuccess, payload: products })
    }
    catch(e) {
      dispatch({ type: ACTION_TYPES.getProductsFail, payload: e })
    }
  }
}
