import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'

import { store } from './store'
import { TimelineEditorView } from './components/TimelineEditorView'
import { persist } from './helpers/persist'
import { createElement, useEffect } from 'react'
import MojsPlayer from '@mojs/player'
import mojs from '@mojs/core'
import { css, Global } from '@emotion/react'

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
      <Global
        styles={css`
          :root {
            --mojs-color-purple: #3a0839;
            --mojs-color-light-purple: #512750; /*613760*/
            --mojs-color-orange: #ff512f;
            --mojs-color-cyan: #50e3c2;
            --mojs-color-white: #ffffff;
            --mojs-color-creamy: #fff5e3;
            --mojs-color-green: #50e3c2;

            --mojs-left-panel-width: 195px; /* old was 165px */
            --mojs-point-size: 6px;
            --mojs-top-panels-size: 22px;
            --mojs-player-size: 40px;
          }
        `}
      />
      <TimelineEditorView />
    </Provider>
  )
}

export const MojsTimelineEditor = createElement(MojsTimelineEditorComponent)
ReactDOM.render(MojsTimelineEditor, document.getElementById('app'))

export const mojsPlayer: MojsPlayer = new MojsPlayer({ add: new mojs.Tween() })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
