import { injectGlobal } from 'styled-components'

import normalize from './generic/normalize'
import fonts from './fonts'

export default () => injectGlobal`
  ${normalize}

  ${fonts}

  body { font-family: "Roboto"; }
`
