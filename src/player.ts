import MojsPlayer from '@mojs/player'
import mojs from '@mojs/core'

export const createMojsPlayer = (options?: MojsPlayer.Options): MojsPlayer => {
  return new MojsPlayer({
    ...(options || {}),
    add: options?.add ? options.add : new mojs.Tween()
  })
}
