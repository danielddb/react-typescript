import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Hello from './hello'

const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(Hello)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./hello', () => {
    const NextApp = require<{default: typeof Hello}>('./hello').default
    render(NextApp)
  })
}