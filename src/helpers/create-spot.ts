export interface CreateSpotOptions {
  time?: number
  value?: number | number[]
  connected?: 'prev' | 'next'
}

export interface Spot {
  time: number
  value: number | number[]
  connected: string | null
  isSelected: boolean
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
