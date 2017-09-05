import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import App from './app'

const Root = ({ store, history }) => {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default Root
