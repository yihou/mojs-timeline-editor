import { allReducers } from './reducers/allReducers'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: allReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['mojs/setTimeline', 'mojs/setPlayer'],
        ignoredPaths: ['mojs.timeline', 'mojs.player']
      }
    })
})

// instance type
export type RootState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers/allReducers', () => {
    store.replaceReducer(allReducers)
  })
}
