import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux'
import createHistory from 'history/createBrowserHistory'
const reactRouterRedux = require('react-router-redux')

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = reactRouterRedux.routerMiddleware(history)

const filter = (state = '', action: any) => {
  switch (action.type) {
    case 'FILTER':
      return 'FILTERED'
    default:
      return state
  }
}

const rootReducer = combineReducers({ filter, router: reactRouterRedux.routerReducer })

const middlewares: any = [middleware]

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
