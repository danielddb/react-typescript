import * as React from 'react'
import { Provider } from 'react-redux'
const ReactRouterRedux = require('react-router-redux')

import App from './app'

interface RootProps {
  history: any
  store: any
}

const Root: React.SFC<RootProps> = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ReactRouterRedux.ConnectedRouter history={history}>
        <App />
      </ReactRouterRedux.ConnectedRouter>
    </Provider>
  );
}

export default Root
