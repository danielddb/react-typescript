import { combineReducers } from 'redux'
const reactRouterRedux = require('react-router-redux')

export default function createReducer(asyncReducers?: any) {
  return combineReducers({
    router: reactRouterRedux.routerReducer,
    ...asyncReducers
  })
}
