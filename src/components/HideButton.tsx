import { Icon } from './Icons/Icon'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Hammer from 'hammerjs'
import { useEffect, useRef } from 'react'

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

export const HideButton = (props: HideButtonProps) => {
  const baseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let hammerInstance

    if (baseRef.current) {
      hammerInstance = new Hammer.Manager(baseRef.current)
      hammerInstance.add(new Hammer.Tap())

      hammerInstance.on('tap', (e) => {
        props.onTap && props.onTap(e)
      })
    }

    return () => {
      hammerInstance?.destroy()
    }
  }, [])

  return (
    <div
      ref={baseRef}
      css={css`
        position: relative;
        top: -${BUTTON_HEIGHT}px;
        left: 50%;

        display: inline-block;
        width: ${BUTTON_WIDTH}px;
        height: ${BUTTON_HEIGHT}px;
        cursor: pointer;

        &:hover {
          opacity: 0.85;
        }

        &:active {
          opacity: 1;
        }
      `}
      data-component="hide-button"
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
          margin-top: ${props.isHidden ? 0 : 1}px;
          transition: transform 0.2s;
          transform: ${props.isHidden ? 'rotate(180deg)' : 'rotate(0deg)'};
          will-change: transform;
        `}
        shape="hide-icon"
      />
    </div>
  )
}
