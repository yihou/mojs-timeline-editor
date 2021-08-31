import { css, Theme } from '@emotion/react'
import { Interpolation } from '@emotion/serialize'

export interface IconProps {
  className?: string
  css?: Interpolation<Theme>
  shape:
    | 'plus'
    | 'dropdown'
    | 'hide-icon'
    | 'spot'
    | 'ellipsis'
    | 'handle'
    | 'tick'
    | 'mojs-logo'
}

export const Icon = (props: IconProps) => {
  const { shape, className } = props
  const markup = `
      <svg viewBox="0 0 32 32">
        <use xlink:href="#${shape}-shape" />
      </svg>
    `

  return (
    <div
      css={css`
        .icon {
          position: relative;
          width: 8px;
          height: 8px;
          cursor: pointer;
          fill: var(--mojs-color-white);
          display: block;

          & > svg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }

          &:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
          }
        }
      `}
      className={className}
      data-component='icon'
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
