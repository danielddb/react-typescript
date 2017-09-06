import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import core from './core'

core.theme()

import { store } from './core/store/configure-store'
import { history } from './core/store/middlewares'

render(
  <AppContainer>
    <core.components.Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)
/*
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/root', () => {
    const newConfigureStore = require('./store/configure-store')
    const newHistory = newConfigureStore.history
    const NewRoot = require('./components/root').default

    render(
      <AppContainer>
        <NewRoot store={store} history={newHistory} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}*/
