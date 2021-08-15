import * as React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'

import { store } from './store'
import { TimelineEditorView } from './components/TimelineEditorView'
import { persist } from './helpers/persist'
import { useEffect } from 'react'
import MojsPlayer from '@mojs/player'
import mojs from '@mojs/core'

/* TODO:
    [x] point-timeline.babel.jsx add animation
        when start/end points got selected
    [x] test if `onClick` handler on components is optimized for mobiles
*/
const MojsTimelineEditorComponent = () => {
  // on mount, persist store
  useEffect(() => {
    persist(store)
  }, [])

  return (
    <Provider store={store}>
      <TimelineEditorView />
    </Provider>
  )
}

export const MojsTimelineEditor = React.createElement(
  MojsTimelineEditorComponent
)
ReactDOM.render(MojsTimelineEditor, document.getElementById('app'))

export const mojsPlayer: MojsPlayer = new MojsPlayer({ add: new mojs.Tween() })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
