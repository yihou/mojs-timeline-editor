import { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { LeftPanel } from './left-panel'
import { BodyPanel } from './body-panel'
import { RightPanel } from './right-panel'
import { TimelineHandle } from '../timeline-handle'
import { constants } from '../../constants'
import { mainPanelSlice } from '../../reducers/mainPanel'
import { GlobalState } from '../../../types/store'

interface MainPanelProps {
  state: GlobalState['mainPanel']
  entireState: GlobalState
}

interface MainPanelStates {
  deltaY: number
}

const MainPanelSection = styled.section<{ isTransition: boolean }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  /*height: 200px;*/
  color: white;
  background: var(--mojs-color-purple);
  ${(props) =>
    props.isTransition &&
    css`
      transition: height 0.4s;
    `};

  [data-component='timeline-handle'] {
    margin-left: var(--mojs-left-panel-width);
    font-size: 1px;
  }
`

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
      <MainPanelSection
        style={{ height }}
        isTransition={state.isTransition}
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
      </MainPanelSection>
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
