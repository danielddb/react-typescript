import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'
import thunk from 'redux-thunk'

import createReducer from './reducers'
import middlewares from './middlewares'

export const store  = configureStore()

function configureStore(initialState?: any): any {
  const store: any = createStore(
    createReducer(),
    initialState,
    compose(applyMiddleware(...middlewares))
  )

  store.asyncReducers = {}

  return store
}

export function injectAsyncReducers(store: any, reducers: any): void {
  store.replaceReducer(createReducer(reducers))
}
