import * as React from 'react'
import { Component } from 'react'

import Hammer from 'hammerjs'
import { constants } from '../constants'
import { isSelectedByConnection } from '../helpers/is-selected-by-connection'
import { pointsSlice } from '../reducers/points'
import { selectedSpotSlice } from '../reducers/selectedSpot'

require('../css/blocks/spot')

interface SpotProps {
  type: 'start' | 'end'
  meta: any
  state: any
  entireState: any
}

interface SpotStates {
  dDelay: number
  dDuration: number
}

export class Spot extends Component<SpotProps, SpotStates> {
  _dot
  render() {
    const { type, state } = this.props
    const { delay, duration } = state
    const { dDelay, dDuration } = this.state

    const delayWidth = delay / 10 + dDelay
    const durationWidth = duration / 10 + dDuration

    const style = {
      width: `${type === 'start' ? delayWidth : durationWidth}em`
    }

    return (
      <div className={this._getClassName()} style={style} data-component='spot'>
        <div className='spot__dot' ref='_dot' />
        {this.props.children}
      </div>
    )
  }

  _getClassName() {
    const { type } = this.props

    const endClass = type === 'end' ? 'spot--end' : ''
    const selectClass = this._isSelected() ? 'is-selected' : ''

    return `spot ${endClass} ${selectClass} ${this._getEasingClass()}`
  }

  _getEasingClass() {
    const { type, state } = this.props
    if (type === 'start') {
      return ''
    }

    const durationWidth = state.duration / 10 + this.state.dDuration
    return durationWidth >= 80 ? 'is-easing' : ''
  }

  _isSelected() {
    const { type, entireState, meta } = this.props
    const { selectedSpot, points } = entireState
    const { id, spotIndex, type: selType, prop } = selectedSpot

    return (
      (meta.id === id &&
        type === selType &&
        meta.spotIndex === spotIndex &&
        meta.prop === prop) ||
      isSelectedByConnection({ ...meta, type }, selectedSpot, points)
    )
  }

  componentWillMount() {
    this.setState({ dDelay: 0, dDuration: 0 })
  }

  componentDidMount() {
    const mc = new Hammer.Manager(this._dot)
    mc.add(new Hammer.Pan())
    mc.add(new Hammer.Tap())
    mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL })

    mc.on('pan', this._pan)
    mc.on('panend', this._panEnd)
    mc.on('tap', this._tap)
  }

  _pan = (e) => {
    const direction = this.props.type
    if (direction === 'end') {
      const threshold = constants.MIN_DURATION
      // TODO: double check
      // previously:
      // const min = -this.props.duration + threshold
      const min = -this.props.state.duration + threshold
      const dDuration = e.deltaX * 10 < min ? min / 10 : e.deltaX
      this.setState({ dDuration })
    }
    if (direction === 'start') {
      this.setState({ dDelay: e.deltaX })
    }
  }

  _panEnd = () => {
    const { meta } = this.props
    const { store } = this.context

    store.dispatch(
      pointsSlice.actions.shiftSegment({
        delay: this.state.dDelay * 10,
        duration: this.state.dDuration * 10,
        ...meta
      })
    )

    this.setState({ dDelay: 0, dDuration: 0 })
  }

  _tap = () => {
    const { store } = this.context
    const { meta, type } = this.props

    store.dispatch(selectedSpotSlice.actions.setSelectedSpot({ type, ...meta }))
  }
}
