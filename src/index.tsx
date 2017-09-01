import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './components/root'
import { configureStore } from './store/configure-store'

const store = configureStore()

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/root', () => {
    const NewRoot = require('./components/root').default

    ReactDOM.render(
        <AppContainer>
            <NewRoot store={store} />
        </AppContainer>,
        document.getElementById('root')
    );
  })
}