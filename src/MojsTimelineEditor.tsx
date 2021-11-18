import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import MojsPlayer from '@mojs/player'
import { Timeline } from '@mojs/core'

import { store } from './store'
import { TimelineEditorView } from './components/TimelineEditorView'
import { persist } from './helpers/persist'
import { createElement, useEffect } from 'react'
import { css, Global } from '@emotion/react'
import { MojsSetup } from './components/MojsSetup'

/* TODO:
    [x] point-timeline.babel.jsx add animation
        when start/end points got selected
    [x] test if `onClick` handler on components is optimized for mobiles
*/
interface MojsTimelineEditorProps {
  timeline?: Timeline
  player?: MojsPlayer
  parent?: HTMLDivElement
  onMounted?: () => void
  withPlayer?: boolean
}

export const MojsTimelineEditor = (props: MojsTimelineEditorProps) => {
  // on mount, persist store
  useEffect(() => {
    const disposeUnloadEvent = persist(store)

    typeof props.onMounted === 'function' && props.onMounted()

    return () => {
      if (disposeUnloadEvent) {
        disposeUnloadEvent()
      }
    }
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
            --mojs-border-radius: 3px;

            --mojs-left-panel-width: 195px; /* old was 165px */
            --mojs-point-size: 6px;
            --mojs-top-panel-size: 22px;
            --mojs-player-size: 40px;
            --mojs-point-line-height: 24px;
          }
        `}
      />
      <MojsSetup
        player={props.player}
        parent={props.parent}
        timeline={props.timeline}
        withPlayer={props.withPlayer}
      />
      <TimelineEditorView />
    </Provider>
  )
}

// noinspection JSUnusedGlobalSymbols
export const createTimelineEditor = (parent = document.body) => {
  const TimelineEditor = createElement(MojsTimelineEditor)
  ReactDOM.render(TimelineEditor, parent)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
