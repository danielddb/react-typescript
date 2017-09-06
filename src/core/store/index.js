import { asyncReducers } from './reducers'
import { configuredStore, injectAsyncReducers } from './configure-store'
import middlewares, { history } from './middlewares'

export {
  asyncReducers,
  configuredStore,
  history,
  injectAsyncReducers,
  middlewares,
}
