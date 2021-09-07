import { constants } from '../constants'
import { addUnload } from './addUnload'
import { SET_APP_STATE } from '../reducers/allReducers'

/**
 * Function to store state into localStorage on page `unload`
 * and restore it on page `load`.
 * @param {Object} store Redux store.
 * @return {Function|void} disposeFunction
 */
export const persist = (store) => {
  const unloadEvent = () => {
    const preState = store.getState()
    try {
      localStorage.setItem(constants.NAME, JSON.stringify(preState))
    } catch (e) {
      console.error(e)
    }
  }

  if (constants.IS_PERSIST_STATE) {
    // save to localstorage
    const disposeFunction = addUnload(unloadEvent)
    // load from localstorage
    try {
      const stored = localStorage.getItem(constants.NAME)
      if (stored) {
        store.dispatch({ type: SET_APP_STATE, data: JSON.parse(stored) })
      }

      return disposeFunction
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
