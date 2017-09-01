import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux'

const filter = (state = '', action: any) => {
  switch (action.type) {
    case 'FILTER':
      return 'FILTERED'
    default:
      return state
  }
}

const rootReducer = combineReducers({ filter })

const middlewares: any = []

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger')

  middlewares.push(logger)
}

export function configureStore(initialState?: any) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  )

  if (module.hot) {
    const nextRootReducer = rootReducer
    store.replaceReducer(nextRootReducer)
    // Enable Webpack hot module replacement for reducers
    // module.hot.accept('../reducers', () => {
    //   const nextRootReducer = require('../reducers/index')
    //   store.replaceReducer(nextRootReducer)
    // })
  }

  return store
}
