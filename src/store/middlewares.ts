import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
const reactRouterRedux = require('react-router-redux')

import createReducer from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routerMiddleware = reactRouterRedux.routerMiddleware(history)

const middlewares: any = [routerMiddleware, thunk]

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger')

  middlewares.push(logger)
}

export default middlewares
