import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { injectGlobal } from 'styled-components'

import Root from './components/root'
import { configureStore, history } from './store/configure-store'

injectGlobal`
  @font-face {
    font-family: 'Roboto Bold';
    src: url(${require('./fonts/roboto/roboto-bold-webfont.woff2')}) format('woff2'),
      url(${require('./fonts/roboto/roboto-bold-webfont.woff')}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto Regular';
    src: url(${require('./fonts/roboto/roboto-regular-webfont.woff2')}) format('woff2'),
      url(${require('./fonts/roboto/roboto-regular-webfont.woff')}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: Roboto Regular;
  }
`

const store = configureStore()

store.dispatch(testingThunk('https://dog.ceo/api/breeds/list/all'))

function testingThunk(url: string) {
  return async (dispatch: any) => {
    dispatch({ type: 'FETCH', payload: url })

    try {
      const response = await fetch(url)

      dispatch({ type: 'FETCH_SUCCESS', payload: response.json() })
    }
    catch(e) {
      dispatch({ type: 'FETCH_ERROR', payload: e })
    }
  }
}

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
