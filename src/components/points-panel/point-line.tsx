import * as React from 'react'
import { Component, ReactNode } from 'react'

import { PropertyLine } from './property-line'
import { PropertyLineAdd } from './property-line-add'
import { Icon } from '../icon'
import { pointsSlice } from '../../reducers/points'

const CLS = require('../../css/blocks/point-line.postcss.css.json')
require('../../css/blocks/point-line')

interface PointLineProps {
  state: any
  entireState: any
}

export class PointLine extends Component<PointLineProps> {
  render() {
    const { state } = this.props

    return (
      <div className={this._getClassName(state)}>
        <div className={CLS.label} onClick={this._onCheck}>
          {state.name}
        </div>

        <div
          className={`${CLS.button} ${CLS['is-spot']}`}
          onClick={this._onAddSpot}
        >
          <div className={CLS.button__inner}>
            <Icon shape='spot' />
          </div>
        </div>

        <div
          className={`${CLS.button} ${CLS['is-arrow']}`}
          onClick={this._onOpen}
        >
          <div className={CLS.button__inner}>
            <Icon shape='dropdown' />
          </div>
        </div>
        <div className={CLS.body}>{this._renderProperties()}</div>
      </div>
    )
  }

  _getClassName(state) {
    const openClass = state.isOpen ? CLS['is-open'] : ''
    const checkClass = state.isSelected ? CLS['is-check'] : ''
    return `${CLS['point-line']} ${openClass} ${checkClass}`
  }

  _renderProperties() {
    const { state } = this.props
    const { props } = state
    const names = Object.keys(props)
    const results: ReactNode[] = []

    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      results.push(<PropertyLine id={state.id} name={name} {...this.props} />)
    }

    results.push(<PropertyLineAdd name={'+ add'} {...this.props} />)

    return results
  }

  _onCheck() {
    // const { state } = this.props
    // const { store } = this.context
    // store.dispatch({ type: 'SELECT_POINT', data: state.id });
  }

  _onAddSpot() {
    const { state, entireState } = this.props
    const { store } = this.context

    store.dispatch(
      pointsSlice.actions.addSnapshot({
        id: state.id,
        time: entireState.progress
      })
    )
  }

  _onOpen = (e) => {
    e.stopPropagation()
    const { state } = this.props
    const { store } = this.context
    store.dispatch(pointsSlice.actions.toggleOpenPoint(state.id))
  }
}
