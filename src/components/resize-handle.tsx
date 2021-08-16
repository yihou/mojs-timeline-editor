import { Component } from 'react'
import Hammer from 'hammerjs'
import propagating from 'propagating-hammerjs'
import { Icon } from './icon'

const CLASSES = require('../css/blocks/resize-handle.postcss.css.json')

interface ResizeHandleProps {
  onResize: (e: any) => void
  onResizeStart: (e: any) => void
  onResizeEnd: (e: any) => void
}

export class ResizeHandle extends Component<ResizeHandleProps> {
  base

  render() {
    return (
      <div className={CLASSES['resize-handle']} data-component='resize-handle'>
        <Icon shape='ellipsis' />
      </div>
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
