import { constants } from '../constants'

export * from './store'

export interface Spot {
  time: number
  value: number | number[]
  connected: string | null
  isSelected: boolean
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

export interface Point {
  id: string
  name: string
  isOpen: boolean
  isSelected: boolean
  currentProps: Record<typeof constants.POSITION_NAME, number[]>
  props: Record<typeof constants.POSITION_NAME, Segment[]>
}
