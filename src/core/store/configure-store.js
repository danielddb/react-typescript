import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'
import thunk from 'redux-thunk'

import createReducer from './reducers'
import middlewares from './middlewares'

export const configuredStore  = configureStore()

function configureStore(initialState)  {
  const store = createStore(
    createReducer(),
    initialState,
    compose(applyMiddleware(...middlewares))
  )

  store.asyncReducers = {}

  return store
}

export function injectAsyncReducers(store, reducers) {
  store.replaceReducer(createReducer(reducers))
}
