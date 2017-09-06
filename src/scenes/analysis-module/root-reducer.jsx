import { combineReducers } from 'redux'
import { NAME } from './constants'
import products from './products'

export default {
  [NAME]: combineReducers({
    [products.constants.NAME]: products.reducer
  })
}
