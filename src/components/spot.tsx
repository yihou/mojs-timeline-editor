import { Component, createRef } from 'react'

import Hammer from 'hammerjs'
import { constants } from '../constants'
import { isSelectedByConnection } from '../helpers/is-selected-by-connection'
import { pointsSlice } from '../reducers/points'
import { selectedSpotSlice } from '../reducers/selectedSpot'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { GlobalState } from '../../types/store'

interface SpotProps {
  type: 'start' | 'end'
  meta: any
  state: any
  entireState: GlobalState
}

interface SpotStates {
  dDelay: number
  dDuration: number
}

const SpotWrapper = styled.div<{ type: SpotProps['type']; isSelect: boolean }>`
  position: relative;
  float: left;
  background: #bca5aa;
  height: 20px;
  border-top-left-radius: var(--mojs-border-radius);
  border-bottom-left-radius: var(--mojs-border-radius);

  ${(props) =>
    props.type === 'end' &&
    css`
      display: block;
      background: transparent;
    `}
`

const SpotDot = styled.div<{ isSelected: boolean; isEasing: boolean }>`
  width: 6px;
  height: 6px;
  position: absolute;
  z-index: 1;
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: pointer;
  transform: rotate(45deg);
  background: var(--mojs-color-purple);

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: var(--mojs-color-orange);
    `}

  &:hover,
  &:active {
    background: var(--mojs-color-light-purple);
    //outline: 1px solid var(--mojs-color-orange);
    outline: 2px solid #bca5aa;
  }

  &:after {
    content: '';
    position: absolute;
    width: 300%;
    height: 300%;
    margin-left: 100%;
    margin-top: 100%;
    transform: rotate(45deg);
    user-select: none;
  }

  [data-component='easing'] {
    display: ${(props) => (props.isEasing ? 'block' : 'none')};
  }
`

export class Spot extends Component<SpotProps, SpotStates> {
  _dot = createRef<HTMLDivElement>()

  render() {
    const { type, state } = this.props
    const { delay, duration } = state
    const { dDelay, dDuration } = this.state

    const delayWidth = delay / 10 + dDelay
    const durationWidth = duration / 10 + dDuration

    const style = {
      width: `${type === 'start' ? delayWidth : durationWidth}em`
    }

    const isSelect = this._isSelected()
    const isEasing = this.isEasing()

    return (
      <SpotWrapper
        type={type}
        isSelect={isSelect}
        style={style}
        data-component='spot'
      >
        <SpotDot ref={this._dot} isSelected={isSelect} isEasing={isEasing} />
        {this.props.children}
      </SpotWrapper>
    )
  }

  isEasing() {
    const { type, state } = this.props
    if (type === 'start') {
      return false
    }

    const durationWidth = state.duration / 10 + this.state.dDuration
    return durationWidth >= 80
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
    if (this._dot.current) {
      const mc = new Hammer.Manager(this._dot.current)
      mc.add(new Hammer.Pan())
      mc.add(new Hammer.Tap())
      mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL })

      mc.on('pan', this._pan)
      mc.on('panend', this._panEnd)
      mc.on('tap', this._tap)
    }
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
