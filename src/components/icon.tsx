import { Component } from 'react'
const CLASSES = require('../css/blocks/icon.postcss.css.json')

export interface IconProps {
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

export class Icon extends Component<IconProps> {
  render() {
    const { shape } = this.props
    const markup = `
      <svg viewBox="0 0 32 32">
        <use xlink:href="#${shape}-shape" />
      </svg>
    `

    return (
      <div
        className={CLASSES.icon}
        data-component='icon'
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    )
  }
}
