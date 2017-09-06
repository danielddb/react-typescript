import React from 'react'

import App from './components/app'
import rootReducer from './root-reducer'
import { helpers } from '../../core'

export default helpers.lazyExport.setup(App, rootReducer)
