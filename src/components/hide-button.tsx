import * as React from 'react'
import { Component } from 'react'

import Hammer from 'hammerjs'
import { Icon } from './icon'

const CLASSES = require('../css/blocks/hide-button.postcss.css.json')
require('../css/blocks/hide-button')

interface HideButtonProps {
  isHidden: boolean
  onTap?: (e: any) => void
}

export class HideButton extends Component<HideButtonProps> {
  base

  render() {
    const p = this.props
    const hideClassName = p.isHidden ? CLASSES['hide-button--is-hidden'] : ''
    const className = `${CLASSES['hide-button']} ${hideClassName}`

    return (
      <div className={className} data-component='hide-button'>
        <div className={CLASSES['hide-button__icon-container']} />
        <Icon shape='hide-icon' />
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
