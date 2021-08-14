/*
  Function to add cross-browser `unload` event.
  @param {Function} Callback for the event.
*/
export const addUnload = (fn) => {
  const unloadEvent = 'onpagehide' in window ? 'pagehide' : 'beforeunload'
  window.addEventListener(unloadEvent, fn)
}
