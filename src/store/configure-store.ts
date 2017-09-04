import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
const reactRouterRedux = require('react-router-redux')

const rootReducer = combineReducers({ router: reactRouterRedux.routerReducer })

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routerMiddleware = reactRouterRedux.routerMiddleware(history)

const middlewares: any = [routerMiddleware, thunk]

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
