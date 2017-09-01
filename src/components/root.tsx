import * as React from 'react'
import { Provider } from 'react-redux'

import App from './app'

interface RootProps {
  store: any
}

const Root: React.SFC<RootProps> = ({ store }) => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default Root