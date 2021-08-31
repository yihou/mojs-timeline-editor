import { Spot } from '../types'

export interface CreateSpotOptions {
  time?: number
  value?: number | number[]
  connected?: 'prev' | 'next'
}

export const createSpot = (o: CreateSpotOptions = {}): Spot => {
  return {
    time: 0,
    value: 0,
    connected: null,
    isSelected: false,
    ...o
  }
}
