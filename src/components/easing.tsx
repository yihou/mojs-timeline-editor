import { Component } from 'react'

import { Icon } from './icon'
import { CurveEditor } from './curve-editor'
import { pointsSlice } from '../reducers/points'
import styled from '@emotion/styled'

const GAP = '---'
const DELIMITER = (
  <option value={GAP} disabled>
    {GAP}
  </option>
)
const EASING_HEIGHT = 14
const EASING_WIDTH = 60
const EASING_ICON_SIZE = 6

const EasingWrapper = styled.div<{ isFull: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  margin-left: -${(props) => (props.isFull ? 0 : EASING_ICON_SIZE)}px;
  margin-top: -${EASING_HEIGHT / 2};

  &:hover {
    opacity: 0.85;
  }
`

const EasingFullIcon = styled.div<{ isFull: boolean }>`
  width: ${EASING_WIDTH}px;
  height: ${EASING_HEIGHT}px;
  background: var(--mojs-color-purple);
  border-radius: var(--mojs-border-radius);
  margin-left: -${EASING_WIDTH / 2};
  display: ${(props) => (props.isFull ? 'block' : 'none')};
`

const EasingShortIcon = styled.div<{ isFull: boolean }>`
  width: ${EASING_HEIGHT}px;
  height: ${EASING_HEIGHT}px;
  cursor: pointer;
  display: ${(props) => (props.isFull ? 'none' : 'block')};

  [data-component='icon'] {
    position: absolute;
    left: 50%;
    top: 50%;
    width: -${EASING_ICON_SIZE}px;
    height: -${EASING_ICON_SIZE}px;
    margin-left: -${EASING_ICON_SIZE / 2}px;
    margin-top: -${EASING_ICON_SIZE / 2}px;
    fill: var(--mojs-color-purple);
  }
`

const EasingDropdownIcon = styled.div`
  .dropdown-icon {
    position: absolute;
    width: ${EASING_HEIGHT};
    height: ${EASING_HEIGHT};
    right: 0;
    top: 0;
    border-left: 1px solid var(--mojs-color-light-purple);

    [data-component='icon'] {
      position: absolute;
      left: 50%;
      top: 50%;
      width: ${EASING_ICON_SIZE};
      height: ${EASING_ICON_SIZE};
      margin-top: -${EASING_ICON_SIZE / 2};
      margin-left: -${EASING_ICON_SIZE / 2 - 1};
      fill: var(--mojs-color-white);
    }
  }
`

const EasingLabel = styled.div`
  .label {
    position: absolute;
    left: -${EASING_WIDTH / 2};
    right: 0;
    top: 3px;
    color: var(--mojs-color-white);
    font-size: 7px;
    /*width:           100%;*/
    letter-spacing: 0.5px;
    padding-right: ${EASING_HEIGHT + 3};
    padding-left: 5px;

    // ellipsis
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const EasingDropdown = styled.div`
  .dropdown {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    select {
      height: 100%;
      width: 100%;

      appearance: none;
      outline: 0;
      border-radius: var(--mojs-border-radius);
      cursor: pointer;
      position: absolute;
      z-index: 1;
      opacity: 0;
    }
  }
`

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
    const isFull = this.props.state.easing !== 'none'

    return (
      <EasingWrapper isFull={isFull} data-component='easing'>
        <EasingShortIcon isFull={isFull}>
          <Icon shape='plus' />
        </EasingShortIcon>
        <EasingFullIcon isFull={isFull}>
          {easing === 'custom' ? <CurveEditor meta={meta} /> : null}
          <EasingLabel title={easing}>{easing}</EasingLabel>
          <EasingDropdownIcon>
            <Icon shape='dropdown' />
          </EasingDropdownIcon>
        </EasingFullIcon>
        <EasingDropdown>
          <select onChange={this._onChange}>
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
        </EasingDropdown>
      </EasingWrapper>
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

  _onChange = (e) => {
    const { store } = this.context
    const { target } = e
    const { value } = target.options[target.selectedIndex]

    const data = { ...this.props.meta, easing: value }
    store.dispatch(pointsSlice.actions.setEasing(data))
  }

  // noinspection JSUnusedGlobalSymbols
  _onEasingAdd() {
    const { store } = this.context

    const data = { ...this.props.meta, easing: 'ease.out' }
    store.dispatch(pointsSlice.actions.setEasing(data))
  }
}
