import { Component } from 'react'

import Hammer from 'hammerjs'
import { constants } from '../constants'
import { pointsSlice } from '../reducers/points'

const CLASSES = require('../css/blocks/point.postcss.css.json')

interface PointProps {
  state: any
  entireState: any
}

export class Point extends Component<PointProps> {
  // getInitialState() { return { deltaX: 0, deltaY: 0 }; }
  _isPan = false
  base: any
  state = { deltaX: 0, deltaY: 0 }

  render() {
    const { state } = this.props
    const [x, y] = this._getXY()

    const style = { transform: `translate(${x}px, ${y}px)` }

    return (
      <div
        style={style}
        className={this._getClassName(state)}
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
    return points[id].props[prop][spotIndex][type].value
  }

  _getClassName(state) {
    const selectClass = state.isSelected ? CLASSES['is-selected'] : ''
    return `${CLASSES.point} ${selectClass}`
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
      store.dispatch(
        pointsSlice.actions.updateSelectedSpot({
          ...selectedSpot,
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
