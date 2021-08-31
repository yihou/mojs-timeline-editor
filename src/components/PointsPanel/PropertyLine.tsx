import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { pointsSlice, UpdateSelectedSpotOptions } from '../../reducers/points'
import { Button } from '../Button'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState, Point } from 'types'
import { BasePointLine } from './BasePointLine'

const isMatch = (spot, id, name) => {
  return spot.id === id && spot.prop === name
}

const PropertyLineLabel = styled.div`
  position: absolute;
  left: 0;
  width: 25%;
  padding-left: 10px;
  line-height: 23px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const PropertyLineInput = styled.input`
  display: block;
  color: white;
  background: transparent;
  border: none;
  height: 24px;
  text-align: center;
  outline: 0;
  font-size: 10px;
  padding-top: 0;
  width: 100%;
  float: left;
  position: relative;
  border-left: 1px solid var(--mojs-color-light-purple);

  &::selection {
    background: var(--mojs-color-orange);
    /*color: var(--mojs-color-purple);*/
  }

  & + & {
    /*&:after {
        content: '';
        position: absolute;
        left: 0;
        height: 50%;
        width: 1px;
        background: yellow;
      }*/
  }

  &[data-width='1/2'] {
    width: calc(100% / 2);
    /*&:first-child {
        text-align: right;
        padding-right: 5px;
      }
      &:last-child {
        text-align: left;
        padding-left: 5px;
      }*/
  }
  &[data-width='1/3'] {
    width: calc(100% / 3);
  }
  &[data-width='1/4'] {
    width: calc(100% / 4);
  }
`
const PropertyLineInputs = styled.div`
  position: absolute;
  right: 24px;
  left: 25%;
`

export interface PropertyLineProps {
  id: string
  name: string
  point: Point
}

export const PropertyLine = (props: PropertyLineProps) => {
  const dispatch = useDispatch()
  const progress = useSelector((state: GlobalState) => state.progress)
  const selectedSpot = useSelector((state: GlobalState) => state.selectedSpot)
  const points = useSelector((state: GlobalState) => state.points)

  const renderInputs = () => {
    let value = getValue()
    value = value instanceof Array ? value : [value]

    const result: ReactNode[] = []
    for (let i = 0; i < value.length; i++) {
      result.push(
        <PropertyLineInput
          key={i}
          value={value[i]}
          data-width={`1/${value.length}`}
          data-index={i}
          onKeyDown={onKeyDown}
        />
      )
    }
    return result
  }

  const onKeyDown = (e) => {
    const { point, name } = props
    const { id } = point

    // if selected spot doesnt match the property line -
    // update the current value
    if (!isMatch(selectedSpot, id, name)) {
      return onKeyDownCurrent(e)
    }

    const target = e.target
    const index = parseInt(target.getAttribute('data-index'), 10)
    const current = getValue()

    // try to parse the input
    const parsed = parseInt(target.value, 10)
    // if fail to parse - set it to the current valid value
    const value = parsed != null && !isNaN(parsed) ? parsed : current[index]

    // if property holds an array clone it
    const newValue = current instanceof Array ? [...current] : value
    // and update the item by index
    if (newValue instanceof Array) {
      newValue[index] = value
    }

    const data: UpdateSelectedSpotOptions = {
      ...selectedSpot,
      id: selectedSpot.id as string,
      type: selectedSpot.type as string,
      spotIndex: selectedSpot.spotIndex as number,
      value: newValue
    }

    let step = e.altKey ? 10 : 1
    if (e.shiftKey) {
      step *= 10
    }

    switch (e.which) {
      case 38: {
        data.value[index] += step
        return dispatch(pointsSlice.actions.updateSelectedSpot(data))
      }

      case 40: {
        data.value[index] -= step
        return dispatch(pointsSlice.actions.updateSelectedSpot(data))
      }

      default: {
        dispatch(pointsSlice.actions.updateSelectedSpot(data))
      }
    }
  }

  const onKeyDownCurrent = (e) => {
    const { point, name } = props

    const target = e.target
    const index = parseInt(target.getAttribute('data-index'), 10)
    const current = getValue()

    // try to parse the input
    const parsed = parseInt(target.value, 10)
    // if fail to parse - set it to the current valid value
    const value = parsed != null && !isNaN(parsed) ? parsed : current[index]

    // if property holds an array clone it
    const newValue = current instanceof Array ? [...current] : value
    // and update the item by index
    if (newValue instanceof Array) {
      newValue[index] = value
    }

    const data = { id: point.id, name, value: newValue }
    let step = e.altKey ? 10 : 1
    if (e.shiftKey) {
      step *= 10
    }

    switch (e.which) {
      case 38: {
        data.value[index] += step
        return dispatch(pointsSlice.actions.updateSelectedSpotCurrent(data))
      }

      case 40: {
        data.value[index] -= step
        return dispatch(pointsSlice.actions.updateSelectedSpotCurrent(data))
      }

      default: {
        return dispatch(pointsSlice.actions.updateSelectedSpotCurrent(data))
      }
    }
  }

  const getValue = () => {
    const { name, point } = props
    const { currentProps, id } = point

    // if selected spot matches the property line -
    // get the selected spot values
    if (point && id && isMatch(selectedSpot, id, name)) {
      const { id, prop, spotIndex, type } = selectedSpot

      if (id && spotIndex && type) {
        return points[id].props[prop][spotIndex][type].value
      }
    }

    return currentProps[name]
  }

  const onAddSpot = () => {
    const p = props

    dispatch(
      pointsSlice.actions.addPropertySegment({
        id: p.id,
        name: p.name,
        time: progress
      })
    )
  }

  return (
    <BasePointLine
      css={css`
        width: 100%;
        cursor: default;
      `}
    >
      <PropertyLineLabel title={props.name}>{props.name}</PropertyLineLabel>
      <PropertyLineInputs>{renderInputs()}</PropertyLineInputs>
      <Button
        css={css`
          right: var(--mojs-point-line-height);
        `}
        icon="spot"
        onClick={onAddSpot}
      />
    </BasePointLine>
  )
}
