import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { constants } from '../constants'

import { getLast } from '../helpers/getLast'
import { createPoint, CreatePointOptions } from '../helpers/createPoint'
import { createSegment } from '../helpers/createSegment'
import { change } from '../helpers/change'
import { Point, Segment } from '../types'

const resetSelectedPoints = (state) => {
  const newState = {}
  const props = Object.keys(state)

  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    const item = state[prop]
    newState[prop] = { ...item, isSelected: false }
  }
  return newState
}

const ensureTimeBounds = (prop, i: number = 0, start: number = 0) => {
  if (i >= prop.length) {
    return
  }
  const item = prop[i]
  // const prevItem = prop[i - 1]
  /* calculate start and end bounds */
  item.start.time = start
  item.end.time = start + item.delay + item.duration
  ensureTimeBounds(prop, i + 1, item.end.time)
}

const addSegment = (segments, name, data, current) => {
  if (!Array.isArray(segments)) {
    throw new Error('`segments` not found')
  }

  const prevSpot = getLast(segments)
  const isChanged = segments.length > 1 || segments[0].isChanged
  const isUpdate = !isChanged && segments[0].duration === constants.MIN_DURATION

  if (isUpdate) {
    segments[0].end.value = current[name]
    segments[0].duration = data.time - segments[0].delay
    // if not - create entirely new segment
  } else {
    const duration = data.time - prevSpot.end.time
    segments.push(
      createSegment({
        index: segments.length,
        startValue: prevSpot.end.value,
        endValue: current[name],
        duration
      })
    )
  }
  ensureTimeBounds(segments)
  return segments
}

export const updateSpot = (currentValue, input) => {
  const { index, value } = input
  // if value is array - update the item in index
  if (!(currentValue instanceof Array)) {
    return value
  }

  const newValue = [...currentValue]
  newValue[index] = value
  return newValue
}

export type PointsState = Record<string, Point>

// Define the initial state using that type
const initialState: PointsState = {}

export interface UpdateSelectedSpotOptions {
  id: string
  type: string
  spotIndex: number
  prop: any
  value: any
}

const reducers = {
  addPoint: (state, action: PayloadAction<CreatePointOptions>) => {
    const newState = resetSelectedPoints(state)
    const point = createPoint(action.payload, Object.keys(newState).length)
    newState[point.id] = point
    state = { ...newState }

    return state
  },
  selectPoint: (state, action: PayloadAction<string>) => {
    state = change(state, [action.payload, 'isSelected'], (state) => !state)

    return state
  },
  toggleOpenPoint: (state, action: PayloadAction<string>) => {
    state = change(state, [action.payload, 'isOpen'], (state) => !state)

    return state
  },
  addSnapshot: (state, action: PayloadAction<{ time: number; id: string }>) => {
    const { id } = action.payload
    const current = state[id]?.currentProps

    if (!current) {
      throw new Error('Current snapshot not found')
    }

    const props = Object.keys(current)
    for (let i = 0; i < props.length; i++) {
      const name = props[i]
      const segments = state[id].props[name]

      state[id].props[name] = addSegment(
        segments,
        name,
        action.payload,
        current
      )
    }
  },
  addPropertySegment: (
    state,
    action: PayloadAction<{ time: number; id: string; name: string }>
  ) => {
    const { id, name } = action.payload
    const current = state[id].currentProps
    const segments: Segment[] = state[id].props[name] || []

    state[id].props[name] = addSegment(segments, name, action.payload, current)
  },
  changePointCurrentPosition: (
    state,
    action: PayloadAction<{ id: string; deltaX: number; deltaY: number }>
  ) => {
    const newState = change(
      state,
      [action.payload.id, 'currentProps'],
      (obj) => {
        const { deltaX: dX, deltaY: dY } = action.payload
        const pos = obj[constants.POSITION_NAME]
        return { ...obj, [constants.POSITION_NAME]: [pos[0] + dX, pos[1] + dY] }
      }
    )

    state = { ...newState }
    return state
  },
  shiftSegment: (
    state,
    action: PayloadAction<{
      id: string
      prop: any
      spotIndex: number
      delay: number
      duration: number
    }>
  ) => {
    const { id, prop, spotIndex, delay = 0, duration = 0 } = action.payload
    const selectedPoint = state[id]

    if (selectedPoint) {
      const selectedSegments: Segment[] = selectedPoint.props[prop]
      const selectedSegment = selectedSegments[spotIndex]

      selectedSegment.duration = Math.max(
        selectedSegment.duration + duration,
        constants.MIN_DURATION
      )
      selectedSegment.delay = Math.max(selectedSegment.delay + delay, 0)

      ensureTimeBounds(selectedSegments)
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn(`point with id '${id}' not found`)
    }
  },
  addPointProperty: (
    state,
    action: PayloadAction<{ id: string; name: string; count: number }>
  ) => {
    const { name, count } = action.payload
    const value = Array(count).fill(0)
    const selectedPoint = state[action.payload.id]

    if (selectedPoint) {
      selectedPoint.props[name] = [
        createSegment({ startValue: value, endValue: value })
      ]

      selectedPoint.currentProps = value
    }
  },
  updateSelectedSpot: (
    state,
    action: PayloadAction<UpdateSelectedSpotOptions>
  ) => {
    const { id, type, spotIndex, prop, value } = action.payload
    const segments = state[id].props[prop]
    const len = Object.keys(segments).length

    const newState = change(
      state,
      [id, 'props', prop, spotIndex, type, 'value'],
      value
    )

    const spot = state[id].props[prop][spotIndex][type]
    if (spot.connected === 'prev' && spotIndex > 0) {
      return change(
        newState,
        [id, 'props', prop, spotIndex - 1, 'end', 'value'],
        value
      )
    }

    if (spot.connected === 'next' && spotIndex < len - 1) {
      return change(
        newState,
        [id, 'props', prop, spotIndex + 1, 'start', 'value'],
        value
      )
    }

    state = { ...newState }
    return state
  },
  updateSelectedSpotCurrent: (
    state,
    action: PayloadAction<{ id: string; value: any; name: string }>
  ) => {
    const { value, name } = action.payload

    const newState = change(
      state,
      [action.payload.id, 'currentProps'],
      (currentProps) => {
        currentProps[name] = value
        return currentProps
      }
    )

    state = { ...newState }
    return state
  },
  setEasing: (
    state,
    action: PayloadAction<{
      id: string
      prop: any
      spotIndex: number
      easing: string
    }>
  ) => {
    const { id, prop, spotIndex, easing } = action.payload

    const newState = change(
      state,
      [id, 'props', prop, spotIndex, 'easing'],
      easing
    )

    state = { ...newState }
    return state
  }
}

export const pointsSlice = createSlice<PointsState, typeof reducers>({
  name: 'points',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers
})
