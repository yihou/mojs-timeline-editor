import { constants } from '../constants'
import { addUnload } from './add-unload'
import { SET_APP_STATE } from '../reducers/allReducers'

/*
  Function to store state into localStorage on page `unload`
  and restore it on page `load`.
  @param {Object} Redux store.
*/
export const persist = (store) => {
  if (constants.IS_PERSIST_STATE) {
    // save to localstorage
    addUnload(() => {
      const preState = store.getState()
      try {
        localStorage.setItem(constants.NAME, JSON.stringify(preState))
      } catch (e) {
        console.error(e)
      }
    })
    // load from localstorage
    try {
      const stored = localStorage.getItem(constants.NAME)
      if (stored) {
        store.dispatch({ type: SET_APP_STATE, data: JSON.parse(stored) })
      }
    } catch (e) {
      console.error(e)
    }
  } else {
    try {
      localStorage.removeItem(constants.NAME)
    } catch (e) {
      console.error(e)
    }
  }
}
