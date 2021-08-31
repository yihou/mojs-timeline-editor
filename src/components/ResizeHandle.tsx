import { Component } from 'react'
import Hammer from 'hammerjs'
import propagating from 'propagating-hammerjs'
import { Icon } from './Icons/Icon'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface ResizeHandleProps {
  onResize: (e: any) => void
  onResizeStart: (e: any) => void
  onResizeEnd: (e: any) => void
}

const HANDLE_WIDTH = 32
const HANDLE_HEIGHT = 16
const ICON_SIZE = 32

const ResizeHandleWrapper = styled.div`
  position: relative;
  top: -${HANDLE_HEIGHT}px;
  left: 50%;
  display: inline-block;
  width: ${HANDLE_WIDTH}px;
  height: ${HANDLE_HEIGHT}px;
  margin-left: 5px;
  cursor: n-resize;
  overflow: hidden;
  border-top-left-radius: var(--mojs-border-radius);
  border-top-right-radius: var(--mojs-border-radius);
  transform-origin: 50% 100%;
  background: var(--mojs-color-purple);
  box-shadow: inset 0 0 0 1px var(--mojs-color-light-purple);

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }

  &:hover {
    opacity: 0.85;
  }
`

export class ResizeHandle extends Component<ResizeHandleProps> {
  base

  render() {
    return (
      <ResizeHandleWrapper data-component='resize-handle'>
        <Icon
          css={css`
            position: absolute;
            top: ${(HANDLE_HEIGHT - ICON_SIZE) / 2}px;
            left: ${(HANDLE_WIDTH - ICON_SIZE) / 2}px;
            width: ${ICON_SIZE}px;
            height: ${ICON_SIZE}px;
            display: inline-block;
          `}
          shape='ellipsis'
        />
      </ResizeHandleWrapper>
    )
  }

  componentDidMount() {
    const mc = propagating(new Hammer.Manager(this.base))
    const p = this.props

    mc.add(new Hammer.Pan({ threshold: 0 }))
    mc.on('pan', (e) => {
      p.onResize(e.deltaY)
      e.stopPropagation()
    })

      .on('panstart', (e) => {
        p.onResizeStart && p.onResizeStart(e)
        e.stopPropagation()
      })
      .on('panend', (e) => {
        p.onResizeEnd && p.onResizeEnd(e)
        e.stopPropagation()
      })
  }
}
