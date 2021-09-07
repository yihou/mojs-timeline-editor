/**
 * Function to add cross-browser `unload` event.
 * @param {Function} fn for the event.
 * @return {() => void} disposeFunction
 */
export const addUnload = (fn) => {
  const unloadEvent = 'onpagehide' in window ? 'pagehide' : 'beforeunload'
  window.addEventListener(unloadEvent, fn)

  return () => window.removeEventListener(unloadEvent, fn)
}
