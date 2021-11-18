import mojs from '@mojs/core'
import MojsPlayer from '@mojs/player'
import { Easing } from '../../types/mojs-easing'

interface StageArguments {
  parent?: HTMLDivElement
  onStart?: () => void
  onComplete?: () => void
}

export class MojsSimpleStage {
  public player
  public timeline
  public args

  mainPositionY = -50

  constructor(args: StageArguments = {}) {
    this.args = args
    this.timeline = new mojs.Timeline()

    const staticTriangle = new mojs.Shape({
      parent: this.args.parent,
      shape: 'polygon',
      duration: 1160,
      radius: { 60: 65 },
      rotate: -60,
      fill: 'red',
      strokeWidth: { 30: 5 },
      easing: Easing.CUBIC_OUT,
      isShowEnd: true,
      width: 170,
      height: 170,
      y: this.mainPositionY
    })

    this.timeline.add(staticTriangle)

    this.player = new MojsPlayer({
      parent: this.args.parent,
      name: 'Mojs Simple',
      add: this.timeline,
      isPlaying: false,
      isRepeat: true,
      isSaveState: false,
      isBounds: true
    })
  }

  initMainTriangle(): void {
    const staticTriangle = new mojs.Shape({
      parent: this.args.parent,
      shape: 'polygon',
      duration: 1160,
      radius: { 60: 65 },
      rotate: -60,
      fill: 'red',
      strokeWidth: { 30: 5 },
      easing: Easing.CUBIC_OUT,
      isShowEnd: true,
      width: 170,
      height: 170,
      y: this.mainPositionY
    })
    this.timeline.add(staticTriangle)
  }
}
