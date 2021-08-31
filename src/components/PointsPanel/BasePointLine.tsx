import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const BasePointLine = styled.div<{ isCheck?: boolean }>`
  position: relative;
  min-height: var(--mojs-point-line-height);
  cursor: pointer;
  color: white;
  font-size: 9px;
  letter-spacing: 0.5px;
  line-height: var(--mojs-point-line-height);
  background: var(--mojs-color-purple);
  border-top: 1px solid var(--mojs-color-light-purple);

  ${({ isCheck }) =>
    isCheck &&
    css`
      background: var(--mojs-color-white);
      color: var(--mojs-color-purple);
    `}
`
