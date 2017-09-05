import React from 'react'
import {
  Link,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import Bundle from './bundle'
import { DEFAULT_ROUTE } from '../constants/routes'

const loadAnalysisModule = require('promise-loader?global,analysis-module!../scenes/analysis-module')
const loadNotFound = require('promise-loader?global,not-found!../scenes/not-found')

const AnalysisModule = (props) => (
  <Bundle loadComponent={loadAnalysisModule}>
    {AnalysisModule => <AnalysisModule {...props} />}
  </Bundle>
)

const NotFound = (props) => (
  <Bundle loadComponent={loadNotFound}>
    {NotFound => <NotFound {...props} />}
  </Bundle>
)

const App = (props) => {
  return (
    <div>
      <Link to={DEFAULT_ROUTE}>Analysis Module</Link>
      <Switch>
        <Route exact path={DEFAULT_ROUTE} component={AnalysisModule} />
        <Redirect from="/" exact to={DEFAULT_ROUTE} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
