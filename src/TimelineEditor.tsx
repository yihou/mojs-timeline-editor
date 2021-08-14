import * as React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import mojs from '@mojs/core'
import MojsPlayer from '@mojs/player'

import { store } from './store'
import { TimelineEditor } from './components/timelineEditor'
import persist from './helpers/persist'

/* TODO:
    [x] point-timleine.babel.jsx add animation
        when start/end points got selected
    [x] test if `onClick` handler on components is optimized for mobiles
*/

// /*
//   API wrapper above the app itself.
// */
// class API {}
// export default API;
// window.MojsTimelineEditor = API;

ReactDOM.render(
  <Provider store={store}>
    <TimelineEditor />
  </Provider>,
  document.getElementById('root')
)

persist(store)

export const mojsPlayer: MojsPlayer = new MojsPlayer({ add: new mojs.Tween() })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
