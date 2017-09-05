import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

import createReducer from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

const middlewares = [routerMiddleware(history), thunk]

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger')

  middlewares.push(logger)
}

export default middlewares
