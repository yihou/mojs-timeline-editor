import { Component, createRef } from 'react'

import { clamp } from '../../helpers/clamp'
import { resetEvent } from '../../helpers/global-reset-event'
import { ToolsPanelButton } from '../tools-panel-button'
import { classNames, refs, compose } from '../../helpers/style-decorator'
import { pointsSlice } from '../../reducers/points'
import { css } from '@emotion/react'

const CLS = require('../../css/blocks/property-line-add.postcss.css.json')
require('../../css/blocks/property-line-add')

const EXIST_MESSAGE = 'already exist'
const DEFAULT_STATE = {
  count: 1,
  name: 'property name',
  isAdd: false,
  error: null
}

interface PropertyLineAddProps {
  state: any
  name: string
}

@compose(classNames(CLS), refs)
export class PropertyLineAdd extends Component<PropertyLineAddProps> {
  // getInitialState() {
  //   this.setState({ x: 0, y: 0 });
  //   return {...DEFAULT_STATE, error: this._isExist() ? EXIST_MESSAGE: null };
  // }
  _isFocus = false
  _name = createRef<HTMLInputElement>()

  state = {
    name: undefined,
    count: 0,
    error: undefined,
    isAdd: false
  }

  render() {
    const { name, count, error } = this.state
    return (
      <div
        css={css`
          $labelWidth: 25%;
          .property-line-add {
            @mixin pointLine;
            width: 100%;
            cursor: default;

            &__inputs {
              position: absolute;
              right: $POINT_LINE_HEIGHT;
              left: 0;
            }

            &.is-add {
              .input,
              [data-component='tools-panel-button'],
              .name-input-wrapper {
                display: block;
              }

              .label {
                display: none;
              }
            }

            &.is-valid {
              .error-label {
                display: none;
              }
              .input {
                &--name {
                  border: 1 * $PX solid transparent;
                }
              }
              [data-component='tools-panel-button'] {
                cursor: pointer;
                &:hover {
                  background: var(--mojs-color-light-purple);
                }
                [data-component='icon'] {
                  opacity: 1;
                  fill: var(--mojs-color-green);
                }
              }
            }
          }

          .name-input-wrapper {
            position: absolute;
            left: 0;
            width: 85.5%;
            display: none;
            height: $POINT_LINE_HEIGHT;
          }

          .error-label {
            position: absolute;
            top: 100%;
            left: 50%;
            padding: 2 * $PX 4 * $PX;
            font-size: 7 * $FPX;
            line-height: 1.5;
            letter-spacing: 0.5 * $PX;
            font-weight: bold;
            margin-top: -1 * $PX;
            background: var(--mojs-color-orange);
            /*color: var(--mojs-color-purple);*/
            /*background:     var(--mojs-color-purple);*/
            /*color: var(--mojs-color-orange);*/
            /*border: 1*$PX solid var(--mojs-color-orange);*/
            border-bottom-left-radius: $BRADIUS;
            border-bottom-right-radius: $BRADIUS;
            transform: translateX(-50%);
          }

          .label {
            position: absolute;
            left: 0;
            width: $labelWidth;
            padding-left: 10 * $PX;
            line-height: $POINT_LINE_HEIGHT - 1;
            &:hover {
              cursor: pointer;
              /*background: var(--mojs-color-light-purple);*/
              text-decoration: underline;
            }
          }

          .input {
            display: block;
            color: white;
            background: transparent;
            border: none;
            height: $POINT_LINE_HEIGHT;
            text-align: center;
            outline: 0;
            font-size: 10 * $PX;
            padding-top: 0;
            padding-bottom: 2 * $PX;
            position: absolute;
            border-left: 1 * $PX solid var(--mojs-color-light-purple);
            display: none;

            &::selection {
              background: var(--mojs-color-orange);
            }

            &--name {
              width: 100%;
              border-left: none;
              text-align: left;
              padding-left: 10 * $PX;
              border: 1 * $PX solid var(--mojs-color-orange);
            }

            &--count {
              right: 0;
              width: $POINT_LINE_HEIGHT;
            }
          }
        `}
        className={this._getClassName()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='label' ref='_label' onClick={this._onLabelClick}>
          {'+ add'}
        </div>
        <div className='property-line-add__inputs'>
          <div className='name-input-wrapper'>
            <input
              className='input input--name'
              ref={this._name}
              value={name}
              onKeyUp={this._onNameKeyUp}
              title='property name'
            />
            <label className='error-label'>{error}</label>
          </div>
          <input
            className='input input--count'
            onKeyUp={this._onCountKeyUp}
            value={count}
            title='number of properties [1...4]'
          />
        </div>
        <ToolsPanelButton onClick={this._onSubmit} icon='tick' />
      </div>
    )
  }

  // TODO: to revisit
  // shouldComponentUpdate(_, nextState) {
  //   this._isFocus = !this.state.isAdd && nextState.isAdd
  // }

  componentDidUpdate() {
    if (this._isFocus) {
      this._name.current?.focus && this._name.current?.focus()
      this._name.current?.select && this._name.current?.select()
    }
    this._isFocus = false
  }

  componentDidMount() {
    this.setState({
      ...DEFAULT_STATE,
      error: this._isExist() ? EXIST_MESSAGE : null
    })

    resetEvent.add(() => {
      this.setState({ isAdd: false })
    })
  }

  _onNameKeyUp = (e) => {
    if (e.which === 13) {
      return this._onSubmit()
    }

    const name = e.target.value
    const trimmedName = name.trim()
    const error =
      trimmedName.length <= 0
        ? 'none-empty'
        : this._isExist(name)
        ? EXIST_MESSAGE
        : null

    this.setState({ name, error })
  }

  _onCountKeyUp = (e) => {
    const code = e.which
    if (code === 8) {
      return
    } // backspace
    if (code === 13) {
      return this._onSubmit()
    }

    const min = 1
    const max = 4

    if (code === 38 || code === 40) {
      const step = e.which === 38 ? 1 : e.which === 40 ? -1 : 0
      const count = clamp(this.state.count + step, min, max)
      return this.setState({ count })
    }

    const value = parseInt(e.target.value, 10)
    const count = clamp(value || this.state.count, min, max)
    this.setState({ count })
  }

  _getClassName() {
    const isAdd = this.state.isAdd ? 'is-add' : ''
    const valid = this.state.error == null ? 'is-valid' : ''

    return `property-line-add ${isAdd} ${valid}`
  }

  _onSubmit() {
    if (this.state.error != null) {
      return
    }

    const { state } = this.props
    const { store } = this.context
    const data = { ...state, property: { ...this.state } }

    const isExist = this._isExist()
    const isDefault = this.state.name === DEFAULT_STATE.name
    const error = isDefault || isExist ? EXIST_MESSAGE : null
    this.setState({ ...DEFAULT_STATE, error })
    store.dispatch(pointsSlice.actions.addPointProperty(data))
  }

  _onLabelClick = () => {
    this.setState({ isAdd: true })
  }

  _isExist(name = DEFAULT_STATE.name) {
    const { state } = this.props
    return state.props[name] != null
  }
}
