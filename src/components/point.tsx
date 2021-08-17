import { Component } from 'react'

import Hammer from 'hammerjs'
import { constants } from '../constants'
import { pointsSlice } from '../reducers/points'
import { css } from '@emotion/react'
import { GlobalState } from '../../types/store'
import { Point as PointType } from '../helpers/create-point'

interface PointProps {
  state: PointType
  entireState: GlobalState
}

export class Point extends Component<PointProps> {
  // getInitialState() { return { deltaX: 0, deltaY: 0 }; }
  _isPan = false
  base: any // TODO: check who define base
  state = { deltaX: 0, deltaY: 0 }

  render() {
    const { state } = this.props
    const [x, y] = this._getXY()

    const style = { transform: `translate(${x}px, ${y}px)` }

    return (
      <div
        css={css`
          position: absolute;
          width: var(--mojs-point-size);
          height: var(--mojs-point-size);
          border-radius: 50%;
          background: var(--mojs-color-orange);
          margin-left: -(var(--mojs-point-size) / 2);
          margin-top: -(var(--mojs-point-size) / 2);

          &:after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 150%;
            height: 150%;
            border: 1px solid var(--mojs-color-orange);
            transform: translate(-50%, -50%);
            /*margin-left: -(150% - 100%);*/
            /*margin-top: -(150% - 100%);*/
            border-radius: 50%;
            opacity: ${state.isSelected ? 1 : 0};
          }
        `}
        style={style}
        onClick={this._onClick}
        title={state.name}
        data-component='point'
      />
    )
  }

  _getXY() {
    const [x, y] = this._getCoords()
    const { deltaX, deltaY } = this.state

    return [x + deltaX, y + deltaY]
  }

  _getCoords() {
    const { state, entireState } = this.props
    const { selectedSpot, points } = entireState

    if (selectedSpot.id == null) {
      return state.currentProps[constants.POSITION_NAME]
    }

    const { id, prop, spotIndex, type } = selectedSpot
    return points[id].props[prop][spotIndex as number][type as string].value
  }

  componentDidMount() {
    const mc = new Hammer.Manager(this.base)
    mc.add(new Hammer.Pan())

    mc.on('pan', this._onPan)
    mc.on('panend', this._onPanEnd)
  }

  _onPan = (e) => {
    const { deltaX, deltaY } = e
    this._isPan = true

    this.setState({ deltaX, deltaY })
  }

  _onPanEnd = (e) => {
    const { store } = this.context
    const { state, entireState } = this.props
    const { id } = state
    const { selectedSpot } = entireState
    const { deltaX, deltaY } = e

    if (selectedSpot.id == null) {
      store.dispatch(
        pointsSlice.actions.changePointCurrentPosition({ deltaX, deltaY, id })
      )
    } else {
      if (!selectedSpot.type || !selectedSpot.spotIndex) {
        throw new Error('Selected spot type | spotIndex is empty')
      }

      store.dispatch(
        pointsSlice.actions.updateSelectedSpot({
          id: selectedSpot.id,
          type: selectedSpot.type,
          spotIndex: selectedSpot.spotIndex,
          prop: selectedSpot.prop,
          value: this._getXY()
        })
      )
    }
    this.setState({ deltaX: 0, deltaY: 0 })
  }

  _onClick = () => {
    if (this._isPan) {
      return (this._isPan = false)
    }
    const { state } = this.props
    const { store } = this.context
    store.dispatch(pointsSlice.actions.selectPoint(state.id))
  }
}
