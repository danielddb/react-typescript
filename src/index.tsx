import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import styles from './theme'
styles()

import Root from './components/root'
import { configureStore, history } from './store/configure-store'

const store = configureStore()

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/root', () => {
    const newConfigureStore = require('./store/configure-store')
    const newHistory = newConfigureStore.history
    const NewRoot = require('./components/root').default

    ReactDOM.render(
      <AppContainer>
        <NewRoot store={store} history={newHistory} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
