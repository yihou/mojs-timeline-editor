import { makeID } from './makeID'
const listeners = {}

const onClick = (e) => {
  const keys = Object.keys(listeners)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const listener = listeners[key]
    if (typeof listener === 'function') {
      listener(e)
    }
  }
}

document.addEventListener('click', onClick)

// make sure hot reload remove previous global event listener
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.dispose(() => {
    document.removeEventListener('click', onClick)
  })
}

export const resetEvent = {
  add: (fun) => {
    const id = makeID()
    listeners[id] = fun
    return id
  },
  remove: (id) => {
    delete listeners[id]
  }
}
