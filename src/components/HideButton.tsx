import { Component } from 'react'

import Hammer from 'hammerjs'
import { Icon } from './Icons/Icon'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface HideButtonProps {
  isHidden: boolean
  onTap?: (e: any) => void
}

const BUTTON_WIDTH = 22
const BUTTON_HEIGHT = 16
const ICON_SIZE = 8

const HideIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  border-top-left-radius: var(--mojs-border-radius);
  border-top-right-radius: var(--mojs-border-radius);
  background: var(--mojs-color-purple);
`

export class HideButton extends Component<HideButtonProps> {
  base

  render() {
    return (
      <div
        css={css`
          position: relative;
          top: -${BUTTON_HEIGHT};
          left: 50%;

          display: inline-block;
          width: ${BUTTON_WIDTH};
          height: ${BUTTON_HEIGHT};
          cursor: pointer;

          &:hover {
            opacity: 0.85;
          }

          &:active {
            opacity: 1;
          }
        `}
        data-component='hide-button'
      >
        <HideIconContainer />
        <Icon
          css={css`
            position: absolute;
            top: ${(BUTTON_HEIGHT - ICON_SIZE) / 2}px;
            left: ${(BUTTON_WIDTH - ICON_SIZE) / 2}px;
            display: inline-block;
            width: ${ICON_SIZE}px;
            height: ${ICON_SIZE}px;
            margin-top: ${this.props.isHidden ? 0 : 1}px;
            transition: ${this.props.isHidden
              ? 'rotate(180deg)'
              : 'transform 0.2s'};
          `}
          shape='hide-icon'
        />
      </div>
    )
  }

  componentDidMount() {
    const mc = new Hammer.Manager(this.base)
    mc.add(new Hammer.Tap())

    mc.on('tap', (e) => {
      this.props.onTap && this.props.onTap(e)
    })
  }
}
