import * as api from './api'
import * as types from './action-types'

export const getProducts = () => (
  async dispatch => {
    dispatch({ type: types.GET_PRODUCTS })

    try {
      const products = await api.getProducts()

      dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: products })
    }
    catch(e) {
      dispatch({ type: types.GET_PROUCTS_FAIL, payload: e })
    }
  }
)
