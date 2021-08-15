import * as React from 'react'
import { Component, createRef } from 'react'
import Hammer from 'hammerjs'

import { Icon } from './icon'
import { selectedSpotSlice } from '../reducers/selectedSpot'
import { progressSlice } from '../reducers/progress'

const CLASSES = require('../css/blocks/timeline-handle.postcss.css.json')

interface TimelineHandleProps {
  state: any
}

interface TimelineHandleStates {
  deltaX: number
}

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
      <div
        className={CLASSES['timeline-handle']}
        style={style}
        data-component='timeline-handle'
      >
        <div className={CLASSES['timeline-handle__head']} ref={this._head}>
          <Icon shape='handle' />
        </div>
      </div>
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
