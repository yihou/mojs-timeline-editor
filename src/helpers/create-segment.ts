import { constants } from '../constants'

import { createSpot, Spot } from './create-spot'
import { fallback } from './fallback'

interface CreateSegmentOptions {
  delay?: number
  duration?: number
  start?: number
  index?: number
  startValue?: number[]
  endValue?: number[]
}

export interface Segment {
  index: number
  start: Spot
  end: Spot
  easing: string
  isChanged: boolean
  isSelected: boolean
  delay: number
  duration: number
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
