import * as React from 'react'
import { Component } from 'react'

import { LeftPanel } from './left-panel'
import { BodyPanel } from './body-panel'
import { RightPanel } from './right-panel'
import { TimelineHandle } from '../timeline-handle'
import { constants } from '../../constants'
import { mainPanelSlice } from '../../reducers/mainPanel'

const CLASSES = require('../../css/blocks/main-panel.postcss.css.json')
require('../../css/blocks/main-panel')

interface MainPanelProps {
  state: any
  entireState: any
}

interface MainPanelStates {
  deltaY: number
}

export class MainPanel extends Component<MainPanelProps, MainPanelStates> {
  state = { deltaY: 0 }

  render() {
    const props = this.props
    const { state } = props
    const { entireState } = props

    const height = this._clampHeight(state.ySize - this.state.deltaY)
    // check state of `hide button` regarding current height
    this._checkHideButton(height)

    return (
      <section
        style={{ height }}
        className={this._getClassNames()}
        data-component='main-panel'
      >
        {'>'}
        <TimelineHandle state={entireState} />
        <LeftPanel state={entireState} />
        <RightPanel
          state={entireState}
          onResize={this._resizeHeight}
          onResizeEnd={this._resizeHeightEnd}
          onResizeStart={this._resizeHeightStart}
        />
        <BodyPanel state={entireState} />
      </section>
    )
  }

  _resizeHeight = (deltaY) => {
    const { state } = this.props
    const { store } = this.context

    // reset `isTransition` state that is responsible
    // for applying a className with transition enabled
    if (state.isTransition) {
      store.dispatch(mainPanelSlice.actions.resetTransition())
    }

    this.setState({ deltaY: this._clampDeltaY(deltaY) })
  }

  _resizeHeightEnd = () => {
    const { store } = this.context
    const { deltaY } = this.state

    const data = this._clampDeltaY(deltaY)
    this.setState({ deltaY: 0 })
    store.dispatch(mainPanelSlice.actions.setYSize(data))
  }

  _resizeHeightStart = () => {
    const { state } = this.props

    if (state.ySize !== this._getMinHeight()) {
      const { store } = this.context
      store.dispatch(mainPanelSlice.actions.saveYPrev())
    }
  }

  // HELPERS

  _getClassNames() {
    const { state } = this.props

    const className = CLASSES['main-panel']
    const transitionClass = state.isTransition
      ? CLASSES['main-panel--transition']
      : ''

    return `${className} ${transitionClass}`
  }

  _clampHeight(height) {
    return Math.max(this._getMinHeight(), height)
  }

  _clampDeltaY(deltaY) {
    const { state } = this.props
    const minSize = this._getMinHeight()
    return state.ySize - deltaY <= minSize ? state.ySize - minSize : deltaY
  }

  _checkHideButton(height) {
    const { state } = this.props
    const { store } = this.context

    // if we drag the panel and it is in `isHidden` state, reset that state
    if (height > this._getMinHeight() && state.isHidden) {
      store.dispatch(mainPanelSlice.actions.setHidden(false))
    }
    // if we drag the panel and it is not in `isHidden` state, set that state
    // and reset prevHeight to add user the ability to expand the panel,
    // otherwise it will stick at the bottom
    if (height === this._getMinHeight() && !state.isHidden) {
      store.dispatch(mainPanelSlice.actions.setHidden(true))
    }
  }

  _getMinHeight() {
    return constants.PLAYER_HEIGHT
  }
}
