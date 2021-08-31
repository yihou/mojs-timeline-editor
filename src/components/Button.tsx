import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { Icon, IconProps } from './Icons/Icon'
import styled from '@emotion/styled'

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconProps['shape']
}

export const ButtonWrapper = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 22px;
  background: inherit;
  border-left: 1px solid var(--mojs-color-light-purple);

  [data-component='icon'] {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5px;
    height: 5px;
    margin-top: -2.5px;
    margin-left: -2.5px;
  }
`

export const ButtonInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  fill: white;
  transition: all 0.15s ease;
`

export const Button = (props: ButtonProps) => (
  <ButtonWrapper {...props} data-component="button">
    <ButtonInner data-component="button-inner">
      <Icon shape={props.icon} />
    </ButtonInner>
  </ButtonWrapper>
)
