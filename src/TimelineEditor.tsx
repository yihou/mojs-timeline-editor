// noinspection JSUnusedGlobalSymbols

import * as React from 'react'
import { render } from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
// import mojs from '@mojs/core'
// import MojsPlayer from '@mojs/player'

import { store } from './store'
import { TimelineEditorView } from './components/TimelineEditorView'
import { persist } from './helpers/persist'

/* TODO:
    [x] point-timeline.babel.jsx add animation
        when start/end points got selected
    [x] test if `onClick` handler on components is optimized for mobiles
*/

// /*
//   API wrapper above the app itself.
// */
// class API {}
// export default API;
// window.MojsTimelineEditor = API;

export const TimelineEditor = () => (
  <Provider store={store}>
    <TimelineEditorView />
  </Provider>
)

// eslint-disable-next-line import/no-default-export
export default () => {
  render(
    <Provider store={store}>
      <TimelineEditorView />
    </Provider>,
    document.body
  )
}

persist(store)

// export const mojsPlayer: MojsPlayer = new MojsPlayer({ add: new mojs.Tween() })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
