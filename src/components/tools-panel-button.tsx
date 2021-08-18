import { Component } from 'react'
import { IconProps } from './icon'
import { css, Interpolation, Theme } from '@emotion/react'
import { Button } from './button'

interface ToolsPanelButtonProps {
  css?: Interpolation<Theme>
  icon: IconProps['shape']
  onClick?: (e: any) => void
}

export class ToolsPanelButton extends Component<ToolsPanelButtonProps> {
  render() {
    return (
      <Button
        css={css`
          width: 24px;
          height: 23px;
          border-left: 1px solid var(--mojs-color-light-purple);
          // TODO: not sure why it's hidden
          display: none;
          cursor: default;

          [data-component='icon'] {
            width: 7px;
            height: 7px;
            margin-top: -3.5px;
            margin-left: -3.5px;
            opacity: 0.5;
            cursor: inherit;
          }
        `}
        {...this.props}
        data-component='tools-panel-button'
      />
    )
  }
}
