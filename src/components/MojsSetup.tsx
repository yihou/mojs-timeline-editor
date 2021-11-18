import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { mojsSlice } from '../reducers/mojs'
import { createMojsPlayer } from '../player'
import { Timeline } from '@mojs/core'
import MojsPlayer from '@mojs/player'

interface StoreSetupProps {
  timeline?: Timeline
  player?: MojsPlayer
  parent?: HTMLDivElement // only requires when player aren't provided
  withPlayer?: boolean
}

export const MojsSetup = (props: StoreSetupProps) => {
  const dispatch = useDispatch()
  // on mount, persist store
  useEffect(() => {
    let player = props.player

    if (!props.player && props.withPlayer) {
      player = createMojsPlayer({
        parent: props.parent as HTMLDivElement
      })
    }

    dispatch(mojsSlice.actions.setPlayer(player))
    dispatch(mojsSlice.actions.setTimeline(props.timeline))

    return () => {
      // remove player before unmount
      player?.el.remove()

      // reset states
      dispatch(mojsSlice.actions.reset())
    }
  }, [props.player, props.timeline])

  return null
}
