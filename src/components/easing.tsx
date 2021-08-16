import { Component } from 'react'

import { Icon } from './icon'
import { CurveEditor } from './curve-editor'
import { pointsSlice } from '../reducers/points'

require('../css/blocks/easing')

const GAP = '---'
const DELIMITER = (
  <option value={GAP} disabled>
    {GAP}
  </option>
)

interface EasingProps {
  state: {
    easing: string
  }
  meta: any
}

export class Easing extends Component<EasingProps> {
  render() {
    const { state, meta } = this.props
    const { easing } = state

    return (
      <div className={this._getClassName()} data-component='easing'>
        <div className='easing__short'>
          <Icon shape='plus' />
        </div>
        <div className='easing__full'>
          {easing === 'custom' ? <CurveEditor meta={meta} /> : null}
          <div className='label' title={easing}>
            {easing}
          </div>
          <div className='dropdown-icon'>
            <Icon shape='dropdown' />
          </div>
        </div>
        <div className='dropdown'>
          <select className='dropdown__select' onChange={this._onChange}>
            {this._makeOption('none')}
            {DELIMITER}
            {this._makeOption('custom')}
            {DELIMITER}
            {this._makeOption('ease.out')}
            {this._makeOption('ease.in')}
            {this._makeOption('ease.inout')}
            {DELIMITER}
            {this._makeOption('sin.out')}
            {this._makeOption('sin.in')}
            {this._makeOption('sin.inout')}
            {DELIMITER}
            {this._makeOption('quad.out')}
            {this._makeOption('quad.in')}
            {this._makeOption('quad.inout')}
            {DELIMITER}
            {this._makeOption('cubic.out')}
            {this._makeOption('cubic.in')}
            {this._makeOption('cubic.inout')}
            {DELIMITER}
            {this._makeOption('quart.out')}
            {this._makeOption('quart.in')}
            {this._makeOption('quart.inout')}
            {DELIMITER}
            {this._makeOption('quint.out')}
            {this._makeOption('quint.in')}
            {this._makeOption('quint.inout')}
            {DELIMITER}
            {this._makeOption('expo.out')}
            {this._makeOption('expo.in')}
            {this._makeOption('expo.inout')}
            {DELIMITER}
            {this._makeOption('circ.out')}
            {this._makeOption('circ.in')}
            {this._makeOption('circ.inout')}
            {DELIMITER}
            {this._makeOption('back.out')}
            {this._makeOption('back.in')}
            {this._makeOption('back.inout')}
            {DELIMITER}
            {this._makeOption('elastic.out')}
            {this._makeOption('elastic.in')}
            {this._makeOption('elastic.inout')}
            {DELIMITER}
            {this._makeOption('bounce.out')}
            {this._makeOption('bounce.in')}
            {this._makeOption('bounce.inout')}
          </select>
        </div>
      </div>
    )
  }

  // _renderEasing() {
  //   const {state, meta} = this.props;
  //   const {easing} = state;
  //
  //   return (easing === 'custom')
  //     ? <CurveEditor meta={meta} />
  //     : <div className="label" title={easing}>{easing}</div>;
  // }

  _makeOption(name) {
    const { easing } = this.props.state
    return (
      <option value={name} selected={easing === name}>
        {name}
      </option>
    )
  }

  _getClassName() {
    const isFull = this.props.state.easing !== 'none' ? 'is-full' : ''
    return `easing ${isFull}`
  }

  _onChange = (e) => {
    const { store } = this.context
    const { target } = e
    const { value } = target.options[target.selectedIndex]

    const data = { ...this.props.meta, easing: value }
    store.dispatch(pointsSlice.actions.setEasing(data))
  }

  _onEasingAdd() {
    const { store } = this.context

    const data = { ...this.props.meta, easing: 'ease.out' }
    store.dispatch(pointsSlice.actions.setEasing(data))
  }
}
