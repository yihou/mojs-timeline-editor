import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { allReducers } from './reducers/allReducers'

export const store = createStore(allReducers, undefined, composeWithDevTools())
