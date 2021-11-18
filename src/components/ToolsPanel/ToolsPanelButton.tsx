import styled from '@emotion/styled'
import { css } from '@emotion/react'

export interface ToolsPanelButtonProps {
  isLink?: boolean
  isActive?: boolean
}

const activeStyle = css`
  background: white;
  color: var(--mojs-color-purple);

  [data-component='icon'] {
    fill: var(--mojs-color-purple);
  }
`

const linkStyle = css`
  float: right;
  fill: var(--mojs-color-white);

  [data-component='icon'] {
    width: 8px;
    height: 8px;
  }
`

export const ToolsPanelButton = styled.div<ToolsPanelButtonProps>`
  position: relative;
  height: 22px;
  line-height: 23px;
  float: left;
  font-size: 7px;
  font-weight: bold;
  letter-spacing: 0.5px;
  padding: 0 7px;
  fill: white;
  user-select: none;
  &:hover {
    cursor: pointer;
    background: #512750;
  }

  &:active {
    ${activeStyle}
  }
  ${({ isActive }) => isActive && activeStyle}

  [data-component='icon'] {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -1px;
    width: 6px;
    height: 6px;
  }

  ${({ isLink }) => isLink && linkStyle}
`
