import React from 'react'
import { render } from 'react-dom'

import * as core from './core'

core.theme()

render(
  <core.components.Root store={core.store.configuredStore} history={core.store.history} />,
  document.getElementById('root')
)
