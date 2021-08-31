import { constants } from '../constants'
import { makeID } from './makeID'
import { createSegment } from './createSegment'
import { Point } from '../types'

export interface CreatePointOptions {
  x: number
  y: number
  name?: string
  time: number
}

export const createPoint = (data: CreatePointOptions, i = 0): Point => {
  const { x, y, name, time } = data

  return {
    id: makeID(),
    name: name || `point${i + 1}`,
    isOpen: true,
    isSelected: false,
    currentProps: { [constants.POSITION_NAME]: [x, y] },
    props: {
      [constants.POSITION_NAME]: [
        createSegment({
          startValue: [x, y],
          endValue: [x, y],
          delay: time
        })
      ]
    }
  }
}
