import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { allReducers } from './reducers/allReducers'

export const store = createStore(allReducers, undefined, composeWithDevTools())

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers/allReducers', () => {
    store.replaceReducer(allReducers)
  })
}
