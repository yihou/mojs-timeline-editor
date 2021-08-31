import { constants } from '../constants'

import { createSpot } from './createSpot'
import { fallback } from './fallback'
import { Segment } from '../types'

interface CreateSegmentOptions {
  delay?: number
  duration?: number
  start?: number
  index?: number
  startValue?: number[]
  endValue?: number[]
}

export const createSegment = (o: CreateSegmentOptions = {}): Segment => {
  const delay = o.delay || 0
  const duration = o.duration || constants.MIN_DURATION
  const start = o.start || 0

  return {
    index: fallback(o.index, 0),
    start: createSpot({
      time: start,
      value: o.startValue,
      connected: 'prev'
    }),
    end: createSpot({
      time: start + delay + duration,
      value: o.endValue,
      connected: 'next'
    }),
    easing: 'none',
    isChanged: false, // if was changed by the user
    isSelected: false,
    delay,
    duration
  }
}
