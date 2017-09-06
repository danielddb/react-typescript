import React from 'react'

import App from './components/app'
import rootReducer from './root-reducer'
import core from '../../core'

const componentExportName = 'App'
const reducerExportName = 'rootReducer'

export default core.helpers.lazyExportHelpers.setup(App, rootReducer)
