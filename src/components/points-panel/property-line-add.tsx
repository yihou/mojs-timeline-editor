import { Component, createRef } from 'react'

import { clamp } from '../../helpers/clamp'
import { resetEvent } from '../../helpers/global-reset-event'
import { ToolsPanelButton } from '../tools-panel-button'
import { pointsSlice } from '../../reducers/points'
import { css } from '@emotion/react'
import { BasePointLine } from './BasePointLine'
import styled from '@emotion/styled'

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

const PropertyLineAddInputs = styled.div`
  position: absolute;
  right: var(--mojs-point-line-height);
  left: 0;
`
const NameInputWrapper = styled.div<{ isAdd: boolean }>`
  position: absolute;
  left: 0;
  width: 85.5%;
  height: var(--mojs-point-line-height);
  display: ${(props) => (props.isAdd ? 'none' : 'block')};
`
const Input = styled.input<{ isAdd: boolean }>`
  //display: block;
  color: white;
  background: transparent;
  border: none;
  height: var(--mojs-point-line-height);
  text-align: center;
  outline: 0;
  font-size: 10px;
  padding-top: 0;
  padding-bottom: 2px;
  position: absolute;
  border-left: 1px solid var(--mojs-color-light-purple);
  display: ${(props) => (props.isAdd ? 'none' : 'block')};

  &::selection {
    background: var(--mojs-color-orange);
  }
`
const ErrorLabel = styled.label<{ isValid: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  padding: 2px 4px;
  font-size: 7px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  font-weight: bold;
  margin-top: -1px;
  background: var(--mojs-color-orange);
  /*color: var(--mojs-color-purple);*/
  /*background:     var(--mojs-color-purple);*/
  /*color: var(--mojs-color-orange);*/
  /*border: 1*$PX solid var(--mojs-color-orange);*/
  border-bottom-left-radius: var(--mojs-border-radius);
  border-bottom-right-radius: var(--mojs-border-radius);
  transform: translateX(-50%);
  display: ${(props) => (props.isValid ? 'none' : 'block')};
`
const PropertyLineAddLabel = styled.div<{ isAdd: boolean }>`
  position: absolute;
  left: 0;
  width: 25%;
  padding-left: 10px;
  line-height: var(--mojs-point-line-height) - 1;
  display: ${(props) => (props.isAdd ? 'block' : 'none')};

  &:hover {
    cursor: pointer;
    /*background: var(--mojs-color-light-purple);*/
    text-decoration: underline;
  }
`

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
    const isValid = !this.state.error
    const isAdd = !this.state.isAdd

    return (
      <BasePointLine
        css={css`
          width: 100%;
          cursor: default;
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <PropertyLineAddLabel
          isAdd={isAdd}
          className='label'
          ref='_label'
          onClick={this._onLabelClick}
        >
          {'+ add'}
        </PropertyLineAddLabel>
        <PropertyLineAddInputs className='property-line-add__inputs'>
          <NameInputWrapper
            isAdd={isAdd}
            data-component='name-input-wrapper'
            className='name-input-wrapper'
          >
            <Input
              isAdd={isAdd}
              css={css`
                width: 100%;
                //border-left: none;
                text-align: left;
                padding-left: 10px;

                ${isValid
                  ? css`
                      border: 1px solid transparent;
                    `
                  : css`
                      border: 1px solid var(--mojs-color-orange);
                    `}
              `}
              className='input input--name'
              ref={this._name}
              value={name}
              onKeyUp={this._onNameKeyUp}
              title='property name'
            />
            <ErrorLabel isValid={isValid} className='error-label'>
              {error}
            </ErrorLabel>
          </NameInputWrapper>
          <Input
            isAdd={isAdd}
            css={css`
              right: 0;
              width: var(--mojs-point-line-height);
            `}
            className='input input--count'
            onKeyUp={this._onCountKeyUp}
            value={count}
            title='number of properties [1...4]'
          />
        </PropertyLineAddInputs>
        <ToolsPanelButton
          css={css`
            ${isAdd &&
            css`
              display: block;
            `}
            ${isValid &&
            css`
              cursor: pointer;
              &:hover {
                background: var(--mojs-color-light-purple);
              }
              [data-component='icon'] {
                opacity: 1;
                fill: var(--mojs-color-green);
              }
            `}
          `}
          onClick={this._onSubmit}
          icon='tick'
        />
      </BasePointLine>
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
