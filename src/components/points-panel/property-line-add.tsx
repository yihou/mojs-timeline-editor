import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { resetEvent } from '../../helpers/global-reset-event'
import { clamp } from '../../helpers/clamp'
import { pointsSlice } from '../../reducers/points'
import { BasePointLine } from './BasePointLine'
import { css } from '@emotion/react'
import { ToolsPanelButton } from '../tools-panel-button'
import { useDispatch } from 'react-redux'
import { Point } from '../../helpers/create-point'

const EXIST_MESSAGE = 'already exist'
const DEFAULT_STATE = {
  count: 1,
  name: 'property name',
  isAdd: false,
  error: undefined
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

interface PropertyLineAddProps {
  state: Point
  name: string
}

export const PropertyLineAdd = (props: PropertyLineAddProps) => {
  const dispatch = useDispatch()

  const [isFocus, setIsFocus] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const [count, setCount] = useState(DEFAULT_STATE.count)
  const [error, setError] = useState<string | undefined>(DEFAULT_STATE.error)
  const [isAdd, setIsAdd] = useState(DEFAULT_STATE.isAdd)
  const [inputName, setInputName] = useState(props.name || DEFAULT_STATE.name)

  const isValid = !error

  const isSegmentExist = (name = DEFAULT_STATE.name) => {
    return props.state.props[name] != null
  }

  // componentDidMount
  useEffect(() => {
    setError(isSegmentExist() ? EXIST_MESSAGE : undefined)

    resetEvent.add(() => {
      setIsAdd(false)
    })
  }, [])

  // componentDidUpdate
  useEffect(() => {
    if (isFocus) {
      nameRef.current?.focus && nameRef.current?.focus()
      nameRef.current?.select && nameRef.current?.select()
    }
    setIsFocus(false)
  }, [isFocus])

  const onNameKeyUp = (e) => {
    if (e.which === 13) {
      return onSubmit()
    }

    const inputValue = e.target.value
    const trimmedName = inputValue.trim()

    let error
    if (trimmedName.length <= 0) {
      error = 'none-empty'
    } else if (isSegmentExist(inputValue)) {
      error = EXIST_MESSAGE
    }

    setInputName(inputValue)
    setError(error)
  }

  const onCountKeyUp = (e) => {
    const code = e.which
    if (code === 8) {
      return
    } // backspace
    if (code === 13) {
      return onSubmit()
    }

    const min = 1
    const max = 4

    if (code === 38 || code === 40) {
      const step = e.which === 38 ? 1 : e.which === 40 ? -1 : 0
      setCount(clamp(count + step, min, max))
      return
    }

    const value = parseInt(e.target.value, 10)
    setCount(clamp(value || count, min, max))
  }

  const setDefault = () => {
    setCount(DEFAULT_STATE.count)
    setError(DEFAULT_STATE.error)
    setIsAdd(DEFAULT_STATE.isAdd)
    setInputName(DEFAULT_STATE.name)
  }

  const onSubmit = () => {
    if (error != null) {
      return
    }

    const isExist = isSegmentExist()
    const isDefault = inputName === DEFAULT_STATE.name

    setDefault()
    setError(isDefault || isExist ? EXIST_MESSAGE : undefined)

    dispatch(
      pointsSlice.actions.addPointProperty({
        count,
        id: props.state.id,
        name: props.state.name
      })
    )
  }

  const onLabelClick = () => {
    setIsAdd(true)
  }

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
        onClick={onLabelClick}
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
            ref={nameRef}
            value={inputName}
            onKeyUp={onNameKeyUp}
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
          onKeyUp={onCountKeyUp}
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
        onClick={onSubmit}
        icon='tick'
      />
    </BasePointLine>
  )
}

// TODO: to revisit
// shouldComponentUpdate(_, nextState) {
//   this._isFocus = !this.state.isAdd && nextState.isAdd
// }
