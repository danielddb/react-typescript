import { applyMiddleware, combineReducers, createStore } from 'redux';

const filter = (state = '', action: any) => {
    switch (action.type) {
        case 'sdf':
            return action.filter;
        default:
            return state;
    }
};

const rootReducer = combineReducers({ filter });

export function configureStore(initialState?: any) {
  const store = createStore(
      rootReducer,
      initialState
  )

  if (module.hot) {
      const nextRootReducer = rootReducer
      store.replaceReducer(nextRootReducer)
    // Enable Webpack hot module replacement for reducers
    // module.hot.accept('../reducers', () => {
    //   const nextRootReducer = require('../reducers/index');
    //   store.replaceReducer(nextRootReducer);
    // });
  }

  return store
}
