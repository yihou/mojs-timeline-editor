import { useEffect, useRef } from 'react'
import Hammer from 'hammerjs'
import propagating, { PropagatedManager } from 'propagating-hammerjs'
import { Icon } from './Icons/Icon'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

export interface ResizeHandleProps {
  onResize: (e: HammerInput) => void
  onResizeStart: (e: HammerInput) => void
  onResizeEnd: (e: HammerInput) => void
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

export const ResizeHandle = (props: ResizeHandleProps) => {
  const baseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let hammerInstance: PropagatedManager

    if (baseRef.current) {
      hammerInstance = propagating(new Hammer.Manager(baseRef.current))
      hammerInstance.add(new Hammer.Pan({ threshold: 0 }))
      hammerInstance.on('pan', (e) => {
        props.onResize(e)
        e.stopPropagation()
      })

      hammerInstance.on('panstart', (e) => {
        props.onResizeStart && props.onResizeStart(e)
        e.stopPropagation()
      })

      hammerInstance.on('panend', (e) => {
        props.onResizeEnd && props.onResizeEnd(e)
        e.stopPropagation()
      })
    }

    return () => {
      if (hammerInstance && hammerInstance.destroy) {
        hammerInstance?.destroy()
      }
    }
  }, [])

  return (
    <ResizeHandleWrapper ref={baseRef} data-component="resize-handle">
      <Icon
        css={css`
          position: absolute;
          top: ${(HANDLE_HEIGHT - ICON_SIZE) / 2}px;
          left: ${(HANDLE_WIDTH - ICON_SIZE) / 2}px;
          width: ${ICON_SIZE}px;
          height: ${ICON_SIZE}px;
          display: inline-block;
        `}
        shape="ellipsis"
      />
    </ResizeHandleWrapper>
  )
}
