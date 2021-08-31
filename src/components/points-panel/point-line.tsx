import { FC, ReactNode } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Button, ButtonProps } from '../button'
import { PropertyLine } from './property-line'
import { PropertyLineAdd } from './property-line-add'
import { pointsSlice } from '../../reducers/points'
import { BasePointLine } from './BasePointLine'
import { Point } from '../../helpers/create-point'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from 'types'

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

export const PointLine = ({ point }: PointLineProps) => {
  const dispatch = useDispatch()
  const progress = useSelector((state: GlobalState) => state.progress)

  const renderProperties = () => {
    const names = Object.keys(point)
    const results: ReactNode[] = []

    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      results.push(<PropertyLine id={point.id} name={name} state={point} />)
    }

    results.push(<PropertyLineAdd name={'+ add'} state={point} />)

    return results
  }

  const onCheck = () => {
    // const { point } = this.props
    // const { store } = this.context
    // dispatch({ type: 'SELECT_POINT', data: point.id });
  }

  const onAddSpot = () => {
    dispatch(
      pointsSlice.actions.addSnapshot({
        id: point.id,
        time: progress
      })
    )
  }

  const onOpen = (e) => {
    e.stopPropagation()
    dispatch(pointsSlice.actions.toggleOpenPoint(point.id))
  }

  return (
    <BasePointLine
      isCheck={point.isSelected}
      css={css`
        margin-top: 10px;
        border-bottom: 1px solid var(--mojs-color-light-purple);
      `}
    >
      <PointLineLabel isCheck={point.isSelected} onClick={onCheck}>
        {point.name}
      </PointLineLabel>

      <PointLineButton
        css={css`
          right: 24px;
        `}
        icon='spot'
        onClick={onAddSpot}
      />

      <PointLineButton
        css={css`
          [data-component='button-inner'] {
            ${point.isOpen &&
            css`
              transform: rotate(180deg);
            `}
          }
        `}
        icon='dropdown'
        onClick={onOpen}
      />
      <PointLineBody isOpen={point.isOpen} isCheck={point.isSelected}>
        {renderProperties()}
      </PointLineBody>
    </BasePointLine>
  )
}
