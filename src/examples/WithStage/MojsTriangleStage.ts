import mojs from '@mojs/core'
import MojsPlayer from '@mojs/player'
import { ShapeOptions } from '@mojs/core'
import { Easing } from '../../types/mojs-easing'

interface StageArguments {
  parent?: HTMLDivElement
  onStart?: () => void
  onComplete?: () => void
}

export class MojsTriangleStage {
  public player
  public timeline
  public args

  COLORS = {
    white: '#ffffff',
    black: '#000000',
    green: '#49F2CC',
    pink: '#777',
    grey: '#29363B',
    cyan: 'cyan',
    yellow: '#FFE202',
    hotpink: 'deeppink'
  }

  getSmallOptions(): ShapeOptions {
    return {
      parent: this.args.parent,
      shape: 'polygon',
      duration: 1160,
      radius: 14,
      rotate: -60,
      fill: 'none',
      stroke: this.COLORS.white,
      strokeWidth: { 14: 4 },
      easing: 'expo.out',
      isShowEnd: false
    }
  }

  mainPositionY = -50

  constructor(args: StageArguments = {}) {
    this.args = args
    this.timeline = new mojs.Timeline()

    this.initMainTriangle()
    this.initSmallTriangles()
    this.initLargeSupportTriangles()

    this.player = new MojsPlayer({
      parent: this.args.parent,
      name: 'Mojs Triangle',
      add: this.timeline,
      isPlaying: true,
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
      fill: 'none',
      stroke: this.COLORS.white,
      strokeWidth: { 30: 5 },
      easing: Easing.CUBIC_OUT,
      isShowEnd: false,
      width: 170,
      height: 170,
      y: this.mainPositionY
    })
    this.timeline.add(staticTriangle)
  }

  initSmallTriangles(): void {
    // small triangles
    const shift1 = 87
    const shift2 = 50

    const small1 = new mojs.Shape({
      ...this.getSmallOptions(),
      x: { 0: -shift1 },
      y: { [this.mainPositionY]: -shift2 + this.mainPositionY }
    })

    const small2 = new mojs.Shape({
      ...this.getSmallOptions(),
      x: { 0: shift1 },
      y: { [this.mainPositionY]: -shift2 + this.mainPositionY }
    })

    const small3 = new mojs.Shape({
      ...this.getSmallOptions(),
      y: { [this.mainPositionY]: 1.15 * shift1 + this.mainPositionY }
    })

    this.timeline.add([small1, small2, small3])
  }

  initLargeSupportTriangles(): void {
    // supporting large triangles
    const supportOptions: ShapeOptions = {
      parent: this.args.parent,
      shape: 'polygon',
      duration: 1000,
      radius: { 40: 20 },
      rotate: -60,
      fill: '#a18989',
      fillOpacity: { 0: 1 },
      stroke: this.COLORS.white,
      strokeWidth: { 7: 0 },
      easing: 'cubic.out',
      delay: 60,
      y: this.mainPositionY,
      // x:            1,
      isShowEnd: false
    }
    const support1 = new mojs.Shape(supportOptions)

    const support2 = new mojs.Shape({
      ...supportOptions,
      strokeWidth: { 4: 0 },
      fill: 'none',
      // duration:     810,
      radius: { 85: 95 }
    })

    this.timeline.add([support1, support2])
  }
}
