import { FC } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Button, ButtonProps } from '../Button'
import { PropertyLine } from './PropertyLine'
import { PropertyLineAdd } from './PropertyLineAdd'
import { pointsSlice } from '../../reducers/points'
import { BasePointLine } from './BasePointLine'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Point } from 'types'

interface PointLineProps {
  point: Point
}

const PointLineLabel = styled.div<{ isCheck: boolean }>`
  position: absolute;
  left: 0;
  right: var(--mojs-point-line-height);
  line-height: calc(var(--mojs-point-line-height)- 3);
  padding-left: 10px;
  background: var(--mojs-color-purple);

  &:hover {
    background: var(--mojs-color-light-purple);
  }

  ${({ isCheck }) =>
    isCheck &&
    css`
      background: inherit;
    `}
`

const PointLineBody = styled.div<{ isOpen: boolean; isCheck: boolean }>`
  padding-left: 5px;
  /*padding-bottom: 1px;*/
  background: var(--mojs-color-light-purple);
  height: auto;
  padding-top: 22px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  ${({ isCheck }) =>
    isCheck &&
    css`
      background: inherit;
    `};
`

interface PointLineButtonProps extends ButtonProps {
  isCheck?: boolean
}

const PointLineButton = styled(Button)<PointLineButtonProps>`
  &:hover {
    background: ${({ isCheck }) => isCheck && 'rgba(61, 12, 59, 0.2)'};
  }
  [data-component='button-inner'] {
    fill: ${({ isCheck }) => isCheck && 'var(--mojs-color-purple)'};
  }
` as FC<PointLineButtonProps>

export const PointLine = (props: PointLineProps) => {
  const dispatch = useDispatch()
  const progress = useSelector((state: RootState) => state.progress)

  const onCheck = () => {
    // const { point } = this.props
    // const { store } = this.context
    // dispatch({ type: 'SELECT_POINT', data: point.id });
  }

  const onAddSpot = () => {
    dispatch(
      pointsSlice.actions.addSnapshot({
        id: props.point.id,
        time: progress
      })
    )
  }

  const onOpen = (e) => {
    e.stopPropagation()
    dispatch(pointsSlice.actions.toggleOpenPoint(props.point.id))
  }

  const names = Object.keys(props.point)

  return (
    <BasePointLine
      isCheck={props.point.isSelected}
      css={css`
        margin-top: 10px;
        border-bottom: 1px solid var(--mojs-color-light-purple);
      `}
    >
      <PointLineLabel isCheck={props.point.isSelected} onClick={onCheck}>
        {props.point.name}
      </PointLineLabel>

      <PointLineButton
        css={css`
          right: 24px;
        `}
        icon="spot"
        onClick={onAddSpot}
      />

      <PointLineButton
        css={css`
          [data-component='button-inner'] {
            ${props.point.isOpen &&
            css`
              transform: rotate(180deg);
            `}
          }
        `}
        icon="dropdown"
        onClick={onOpen}
      />
      <PointLineBody
        isOpen={props.point.isOpen}
        isCheck={props.point.isSelected}
      >
        {names.map((name) => (
          <PropertyLine
            key={`${props.point.id}_${name}`}
            id={props.point.id}
            name={name}
            point={props.point}
          />
        ))}
        <PropertyLineAdd name={'+ add'} state={props.point} />
      </PointLineBody>
    </BasePointLine>
  )
}
