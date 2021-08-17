import { Component, FC, ReactNode } from 'react'

import { PropertyLine } from './property-line'
import { PropertyLineAdd } from './property-line-add'
import { pointsSlice } from '../../reducers/points'
import { BasePointLine } from './BasePointLine'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Button, ButtonProps } from '../button'
import { GlobalState } from '../../../types/store'

interface PointLineProps {
  state: any
  entireState: GlobalState
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

export class PointLine extends Component<PointLineProps> {
  render() {
    const { state } = this.props

    return (
      <BasePointLine
        isCheck={state.isSelected}
        css={css`
          margin-top: 10px;
          border-bottom: 1px solid var(--mojs-color-light-purple);
        `}
      >
        <PointLineLabel isCheck={state.isSelected} onClick={this._onCheck}>
          {state.name}
        </PointLineLabel>

        <PointLineButton
          css={css`
            right: 24px;
          `}
          icon='spot'
          onClick={this._onAddSpot}
        />

        <PointLineButton
          css={css`
            [data-component='button-inner'] {
              ${state.isOpen &&
              css`
                transform: rotate(180deg);
              `}
            }
          `}
          icon='dropdown'
          onClick={this._onOpen}
        />
        <PointLineBody isOpen={state.isOpen} isCheck={state.isCheck}>
          {this._renderProperties()}
        </PointLineBody>
      </BasePointLine>
    )
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
