import { Component, ReactNode } from 'react'

import { MainPanel } from './main-panel/main-panel'
import { Icons } from './icons'
import { InsertPoint } from './insert-point'
import { Point } from './point'
import styled from '@emotion/styled'
import { controlsSlice } from '../reducers/controls'

// const CLASSES = require('../css/blocks/timeline-editor.postcss.css.json');

// @classNames(require('../css/blocks/timeline-editor.postcss.css.json'))

const Wrapper = styled.div`
  .timeline-editor {
    font-family: Arial, sans-serif;
    & * {
      box-sizing: border-box;
      user-select: none;
    }

    &__el {
      outline: 1px solid;
    }
  }
`

export class TimelineEditorView extends Component {
  getState = () => {
    const { store } = this.context
    return store.getState()
  }

  render() {
    const state = this.getState()

    return (
      <Wrapper>
        <InsertPoint state={state} />
        <div>{this._renderPoints()}</div>
        <div className='timeline-editor' onMouseMove={this._mouseMove}>
          <Icons />
          <MainPanel state={state.mainPanel} entireState={state} />
        </div>
      </Wrapper>
    )
  }

  _renderPoints() {
    const results: ReactNode[] = []
    const { points } = this.getState()

    const props = Object.keys(points)
    const state = this.getState()

    for (let i = 0; i < props.length; i++) {
      const key = props[i]
      results.push(<Point state={points[key]} entireState={state} />)
    }

    return results
  }

  componentDidMount() {
    const { store } = this.context
    store.subscribe(this.forceUpdate.bind(this))
    document.addEventListener('mousemove', this._docMouseMove)
  }

  _mouseMove = (e) => {
    /* we cannot `stopPropagation` the event, because `hammerjs`
       will not be able to work properly on `resize-handle`, so we
       set the `isTimelinePanel` flag instead indicating that we are
       inside the `timeline-editor` panel
    */
    e.isTimelinePanel = true
    const { store } = this.context
    const { controls } = this.getState()
    if (controls.isMouseInside) {
      return
    }

    store.dispatch(controlsSlice.actions.controlsSetMouseInside(true))
  }

  _docMouseMove = (e) => {
    if (e.isTimelinePanel) {
      return
    }
    const { store } = this.context
    const { controls } = this.getState()

    if (controls.isMouseInside) {
      store.dispatch(controlsSlice.actions.controlsSetMouseInside(false))
    }
  }
}
