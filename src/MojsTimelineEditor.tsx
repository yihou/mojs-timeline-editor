import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'

import { store } from './store'
import { TimelineEditorView } from './components/TimelineEditorView'
import { persist } from './helpers/persist'
import { createElement, useEffect, useRef } from 'react'
import { css, Global } from '@emotion/react'
import { createMojsPlayer } from './player'

/* TODO:
    [x] point-timeline.babel.jsx add animation
        when start/end points got selected
    [x] test if `onClick` handler on components is optimized for mobiles
*/
export const MojsTimelineEditor = ({ withPlayer = true }) => {
  const editorWrapperRef = useRef<HTMLDivElement>(null)
  // on mount, persist store
  useEffect(() => {
    const disposeUnloadEvent = persist(store)
    let mojsPlayer

    if (withPlayer) {
      mojsPlayer = createMojsPlayer({
        parent: editorWrapperRef.current as HTMLDivElement
      })
    }

    return () => {
      // remove player before unmount
      mojsPlayer?.el.remove()

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
      <TimelineEditorView ref={editorWrapperRef} />
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
