import { Component, createRef } from 'react'
import Hammer from 'hammerjs'

import { Icon } from './icon'
import { selectedSpotSlice } from '../reducers/selectedSpot'
import { progressSlice } from '../reducers/progress'
import styled from '@emotion/styled'

interface TimelineHandleProps {
  state: any
}

interface TimelineHandleStates {
  deltaX: number
}

const TIMELINE_HEAD_SIZE = 14
const TIMELINE_ICON_SIZE = 6

const TimelineHandleWrapper = styled.div`
  .timeline-handle {
    position: absolute;
    min-height: 100%;
    width: 1px;
    background: var(--mojs-color-orange);
    z-index: 20;
  }
`

const TimelineHandleHead = styled.div`
  cursor: pointer;
  background: var(--mojs-color-purple);
  border: 1px solid var(--mojs-color-orange);
  width: ${TIMELINE_HEAD_SIZE}px;
  height: ${TIMELINE_HEAD_SIZE}px;
  border-radius: 5px 5px 11px 11px;
  position: absolute;
  left: -${TIMELINE_HEAD_SIZE / 2}px;
  top: -${0.8 * TIMELINE_HEAD_SIZE}px;

  [data-component='icon'] {
    position: absolute;
    width: ${TIMELINE_ICON_SIZE}px;
    height: ${TIMELINE_ICON_SIZE}px;
    left: 50%;
    top: 50%;
    margin-left: -${TIMELINE_ICON_SIZE / 2}px;
    margin-top: -${TIMELINE_ICON_SIZE / 2 - 1}px;
  }

  &:hover {
    [data-component='icon'] {
      opacity: 0.85;
    }
  }
`

export class TimelineHandle extends Component<
  TimelineHandleProps,
  TimelineHandleStates
> {
  state = {
    deltaX: 0
  }

  _head = createRef<HTMLDivElement>()

  // getInitialState() { return { deltaX: 0 }; }
  render() {
    const { state } = this.props
    const shift = (state.progress + this.state.deltaX) / 10
    const style = { transform: `translateX(${shift}em)` }

    return (
      <TimelineHandleWrapper style={style} data-component='timeline-handle'>
        <TimelineHandleHead ref={this._head}>
          <Icon shape='handle' />
        </TimelineHandleHead>
      </TimelineHandleWrapper>
    )
  }

  componentWillMount() {
    this.setState({ deltaX: 0 })
  }

  componentDidMount() {
    if (this._head) {
      const mc = new Hammer.Manager(this._head.current as any)
      mc.add(new Hammer.Pan())

      const { store } = this.context
      mc.on('pan', (e) => {
        this.setState({ deltaX: this._clampDeltaX(10 * e.deltaX, 7000) })
      })

      mc.on('panstart', () => {
        store.dispatch(selectedSpotSlice.actions.resetSelectedSpot())
      })

      mc.on('panend', () => {
        const { state } = this.props
        const data = state.progress + this.state.deltaX
        store.dispatch(progressSlice.actions.setProgress(data))
        this.setState({ deltaX: 0 })
      })
    }
  }

  _clampDeltaX(deltaX, max) {
    const { state } = this.props
    deltaX = state.progress + deltaX < 0 ? -state.progress : deltaX
    deltaX = state.progress + deltaX > max ? max - state.progress : deltaX
    return deltaX
  }
}
