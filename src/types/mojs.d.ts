// noinspection JSUnusedGlobalSymbols

declare module '@mojs/core' {
  // eslint-disable-next-line import/no-default-export
  export default mojs
  export type Timeline = mojs.Timeline
  export type Shape = mojs.Shape
  export type Tween = mojs.Tween

  export namespace mojs {
    // define custom name here.
    export class Shape extends Tunable {
      constructor(opts: ShapeOptions | CustomShapeOptions<string>)
    }

    function addShape(name: string, shape: any)

    class Module {
      constructor(opts?: any)
    }

    class CustomShape {}

    /** Easing */
    interface LinearEase {
      none()
    }

    interface DefaultEasing {
      in(p: any)

      out(p: any)

      inout(p: any)
    }

    class Tweenable extends Module {
      /**
       *  Starts playback.
       *  @param shift {Number} Start progress shift in milliseconds.
       */
      play(shift?: number)

      /**
       *  Starts playback in backward direction.
       *  @param shift {Number} Start progress shift in milliseconds.
       */
      playBackward(shift?: number)

      /**
       *  Pause
       *  */
      pause()

      /**
       *  Restarts playback.
       *  @param shift {Number} Start progress shift in milliseconds.
       *  */
      replay(shift?: number)

      /**
       *  Restarts playback in backward direction.
       *  @param shift {Number} Start progress shift in milliseconds.
       *  */
      replayBackward(shift?: number)

      /**
       *  Resumes playback in direction it was prior to `pause`.
       *  @param shift {Number} Start progress shift in milliseconds.
       *  */
      resume(shift?: number)

      /**
       *  Sets progress of the tween.
       *  @param progress {Number} Progress to set [ 0..1 ].
       *  */
      setProgress(progress)

      /**
       *  Sets speed of the tween.
       *  @param speed {Number} Progress to set [ 0..∞ ].
       *  */
      setSpeed(speed)

      /**
       *  Stops and resets the tween
       */
      reset()
    }

    class Thenable extends Tweenable {
      /**
       *  Creates next state transition chain.
       */
      then(o: Object): this
    }

    class Tunable extends Thenable {
      /**
       *  Tunes start state with new options.
       *  @param opts {ShapeOptions} New start properties.
       */
      tune(opts: ShapeOptions): this

      /**
       *  Regenerates all randoms in initial properties.
       */
      generate(): this
    }

    type ShapeTypes =
      | 'circle'
      | 'rect'
      | 'polygon'
      | 'line'
      | 'cross'
      | 'equal'
      | 'curve'
      | 'zigzag'
      | string

    interface ShapeOptions extends TweenCallbacks {
      /**
       *  Parent of the module.
       *  {String, Object}
       *  [selector, HTMLElement]
       */
      parent?: string | Object | Element | null

      /**
       * Class Name
       * {string}
       */
      className?: string

      /**
       *  Name of Shape
       *  {string}
       *  [ 'circle' | 'rect' | 'polygon' | 'line' | 'cross' | 'equal' | 'curve' | 'zigzag' | '*custom defined name*' ]
       */
      shape?: ShapeTypes

      /**
       * Stroke color.
       * {String}
       * ∆ :: Possible values: [color name, rgb, rgba, hex]
       */
      stroke?: 'transparent' | string | any

      /**
       *  Stroke Opacity.
       *  {Number}
       *  ∆ :: Possible values: [ 0..1 ]
       */
      strokeOpacity?: number

      /**
       *  Stroke Line Cap.
       *  {String}
       *  ['butt' | 'round' | 'square']
       */
      strokeLinecap?: 'butt' | 'round' | 'square'

      /**
       *  Stroke Width.
       *  {Number}
       *  ∆ :: Possible values: [ number ]
       */
      strokeWidth?: DeltaValue

      /**
       *  Stroke Dash Array.
       *  ∆ :: Units :: Possible values: [ number, string ]
       */
      strokeDasharray?: DeltaValue

      /**
       *  Stroke Dash Offset.
       *  ∆ :: Units :: Possible values: [ number, string ]
       */
      strokeDashoffset?: DeltaValue

      /**
       *  Fill Color.
       *  {String}
       *  ∆ :: Possible values: [color name, rgb, rgba, hex]
       */
      fill?: string | CustomDelta<string> | any

      /**
       *  Fill Opacity.
       *  {Number}
       *  ∆ :: Possible values: [ 0..1 ]
       */
      fillOpacity?: DeltaNumberValue

      /**
       *  Left position of the module.
       *  ∆ :: Units :: Possible values: [ number, string ]
       */
      left?: DeltaValue

      /**
       *  Top position of the module.
       *  ∆ :: Units :: Possible values: [ number, string ]
       */
      top?: DeltaValue

      /**
       *  X shift.
       *  ∆ :: Units :: Possible values: [ number, string ]
       */
      x?: DeltaValue

      /**
       *  Y shift.
       *  ∆ :: Possible values: [ number ]
       */
      y?: DeltaValue

      /**
       *  Rotate (old: angle).
       *  ∆ :: Possible values: [ number ]
       */
      rotate?: DeltaValue

      /**
       *  Scale of the module.
       *  ∆ :: Possible values: [ number ]
       */
      scale?: DeltaValue

      /**
       *  Explicit scaleX value (fallbacks to `scale`).
       *  ∆ :: Possible values: [ number ].
       */
      scaleX?: DeltaNumberValue

      /**
       *  Explicit scaleX value (fallbacks to `scale`).
       *  ∆ :: Possible values: [ number ].
       */
      scaleY?: DeltaNumberValue

      /**
       *  Origin for `x`, `y`, `scale`, `rotate` properties.
       *  ∆ :: Possible values: [ number, string ]
       */
      origin?: DeltaValue

      /**
       *  Opacity.
       *  {Number}
       *  ∆ :: Possible values: [ 0..1 ]
       */
      opacity?: DeltaValue

      /**
       *  X border radius.
       *  ∆ :: Units :: Possible values: [ number, string ]
       */
      rx?: DeltaValue

      /**
       *  Y border radius.
       *  ∆ :: Units :: Possible values: [ number, string ]
       */
      ry?: DeltaValue

      /**
       *  Points count ( for polygon, zigzag, equal ).
       *  ∆ :: Possible values: [ number ]
       */
      points?: DeltaValue

      /**
       *  Radius of the shape.
       *  ∆ :: Possible values: [ number ]
       */
      radius?: DeltaValue

      /**
       *  Radius X of the shape (fallbacks to `radius`).
       *  ∆ :: Possible values: [ number ]
       */
      radiusX?: DeltaValue

      /**
       *  Radius Y of the shape (fallbacks to `radius`).
       *  ∆ :: Possible values: [ number ]
       */
      radiusY?: DeltaValue

      /**
       *  If should hide module with `transforms` instead of `display`.
       *  {Boolean}
       */
      isSoftHide?: boolean

      /**
       *  If should trigger composite layer for the module.
       *  {Boolean}
       */
      isForce3d?: boolean

      /**
       *  If should be shown before animation starts.
       *  {Boolean}
       */
      isShowStart?: boolean

      /**
       *  If should be shown after animation ends.
       *  {Boolean}
       */
      isShowEnd?: boolean

      /**
       *  If refresh state on subsequent plays.
       *  {Boolean}
       */
      isRefreshState?: boolean

      /**
       *  Context callbacks will be called with.
       *  {Object}
       */
      callbacksContext?: Object

      /**
       *  Duration
       */
      duration?: number

      /**
       *  Delay
       */
      delay?: number

      /**
       *  If should repeat after animation finished
       *  {Number} *(1)
       */
      repeat?: number

      /**
       *  Speed of the tween
       *  {Number}
       *  [0..∞]
       */
      speed?: number | any

      /**
       *  If the progress should be flipped on repeat animation end
       *  {Boolean}
       */
      isYoyo?: boolean

      /**
       *  Easing function
       *  {String, Function}
       *  [ easing name, path coordinates, bezier string, easing function ]
       */
      easing?: EasingOption

      /**
       *  Easing function for backward direction of the tween animation (fallbacks to `easing`)
       *  {String, Function}
       *  [ easing name, path coordinates, bezier string, easing function ]
       */
      backwardEasing?: EasingOption

      width?: any
      height?: any
    }

    interface CustomShapeOptions<Shape extends string> extends ShapeOptions {
      shape: Shape
    }

    type EasingPath = Function

    /**
     * exp string: 'ease.in'. can refer to ./utils/mojo.ts
     * exp bezier path: 'bezier()'
     * exp using mojs easing.path: mojs.easing.path('M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0')
     * exp svg path easing: 'M0,100 C50,100 50,67.578125 50,50 C50,32.421875'
     */
    type EasingOption = string | Function

    class easing {
      static bezier(...args)

      static mix(...args)

      static path(path: string): EasingPath

      static approximate(slowEasing: Function | ((path: string) => any))

      static inverse()

      static linear: DefaultEasing
      static ease: DefaultEasing
      static sin: DefaultEasing
      static quad: DefaultEasing
      static cubic: DefaultEasing
      static quart: DefaultEasing
      static quint: DefaultEasing
      static expo: DefaultEasing
      static circ: DefaultEasing
      static back: DefaultEasing
      static elastic: DefaultEasing
      static bounce: DefaultEasing
    }

    interface h {
      NS()

      logBadgeCss()

      force3d(el: any)
    }

    // The list of available units: px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin.
    // <property> : '20rem',
    // <property> : { '10%' : '100%' },
    // <property> : 'rand(min, max)',
    // <property> : [ 20, { 20 : 0 }, 'rand(0, 20)', null ]
    type PropertyValue<T = number | string> = T | any[]

    interface DeltaConfig {
      delay?: number
      duration?: number
      easing?: EasingOption
      onComplete?: () => any
    }

    interface CustomDelta<T = number | string> {
      [delta: string]: PropertyValue<T>
    }

    type DeltaValue = PropertyValue | CustomDelta | DeltaConfig
    type DeltaNumberValue = PropertyValue<number> | CustomDelta<number>

    // Custom properties to alter mojs behaviour (see `Teach mojs with customProperties` section). {Object}
    // ref: https://mojs.github.io/api/modules/html/#teach-mojs-with-customproperties
    type HTMLCustomProperties = {
      [cssProps in keyof CSSStyleDeclaration]: any
    } & {
      draw: (el, props) => any
    }

    // adjustable props for HTMLOptions
    type AdjustableHTMLProperties =
      | 'x'
      | 'y'
      | 'z'
      | 'skewX'
      | 'skewY'
      | 'rotateX'
      | 'rotateY'
      | 'rotateZ'
      | 'scale'
      | 'scaleX'
      | 'scaleY'
      | 'opacity'

    // adjustable html props for HTMLOptions
    type HTMLProperties = {
      [htmlProps in AdjustableHTMLProperties]: DeltaValue
    }

    // adjustable css props for HTMLOptions
    type AdjustableCSSProperties = {
      /**
       * CSS properties, would be inferred automatically, please set them in camelCase
       * ref: https://mojs.github.io/api/modules/html/#other-css-properties
       * exp: borderColor: { cyan: "#FA3204" },
       * exp: borderWidth: { 2: 12 },
       */
      [cssProps in keyof Omit<CSSStyleDeclaration, 'opacity' | 'scale'>]: any
    }

    interface HTMLOptions
      extends TweenCallbacks,
        HTMLProperties,
        AdjustableCSSProperties {
      /**
       *  HTMLElement to animate.
       *  {String, Object}
       *  [selector, HTMLElement]
       */
      el?: string | HTMLElement | Object
      customProperties?: HTMLCustomProperties
    }

    class Html extends Thenable {
      constructor(opts: HTMLOptions)
    }

    interface ShapeSwirlOptions extends ShapeOptions {
      /**
       *  Deviation size of sine.
       *  ∆ :: [number > 0] :: Degree size of the sinusoidal path.
       */
      swirlSize?: number | { [delta: string]: string }

      /**
       *  Frequency of sine.
       *  ∆ :: [number > 0] :: Frequency of the sinusoidal path.
       */
      swirlFrequency?: number | { [delta: string]: number }

      /**
       *  Sine length scale.
       *   ∆ :: [number > 0] :: Sinusoidal path length scale.
       *  [ 0..1 ]
       */
      pathScale?: number | { [delta: string]: number }

      /**
       *  Degree shift for sine path.
       *  ∆ :: [number] :: Degree shift for the sinusoidal path
       */
      degreeShift?: number | { [delta: string]: number }

      /**
       *   Direction of sine.
       *  {Number}
       *  [ -1, 1 ]
       */
      direction?: number

      /**
       *  If shape should follow sinusoidal path.
       *  {Boolean}
       */
      isSwirl?: boolean

      isTimelineLess?: boolean
    }

    class ShapeSwirl extends Shape {
      constructor(opts: ShapeSwirlOptions)
    }

    interface BurstOptions {
      /**
       *  Parent of the module.
       *  {String, Object}
       *  [selector, HTMLElement]
       */
      parent: string | Object | HTMLElement

      /**
       * Class Name
       * {string}
       */
      className?: string

      /**
       *  Left position of the module.
       *  {Number, String}
       */
      left?: string | number

      /**
       *  Top position of the module.
       *  {Number, String}
       */
      top?: string | number

      /**
       *  X shift.
       *  {Number, String}
       */
      x?: number | string

      /**
       *  Y shift.
       *  {Number, String}
       */
      y?: number | string

      /**
       *  Angle.
       *  {Number, String}
       */
      rotate?: number | string

      /**
       *  Scale of the module.
       *  {Number}
       */
      scale?: number

      /**
       *  Explicit scaleX value (fallbacks to `scale`).
       *  {Number}
       */
      scaleX?: number

      /**
       *  Explicit scaleX value (fallbacks to `scale`).
       *  {Number}
       */
      scaleY?: number

      /**
       *  Origin for `x`, `y`, `scale`, `rotate` properties.
       *  {String}
       */
      origin?: string

      /**
       *  Opacity.
       *  {Number}
       *  [ 0..1 ]
       */
      opacity?: number

      /**
       *  Quantity of Burst particles.
       *  {Number}
       *  [ > 0 ]
       */
      count: number

      /**
       *  Degree of circular shape that the particles form.
       *  {Number}
       *  [ > 0 ]
       */
      degree: number

      /**
       *  Radius of the Burst.
       *  {Number}
       */
      radius: number

      /**
       *  Radius X of the Burst.
       *  {Number}
       */
      radiusX: number

      /**
       *  Radius Y of the Burst.
       *  {Number}
       */
      radiusY: number

      /**
       *  If should hide module with `transforms` instead of `display`.
       *  {Boolean}
       */
      isSoftHide?: boolean

      /**
       *  If should trigger composite layer for the module.
       *  {Boolean}
       */
      isForce3d?: boolean

      /**
       *  If should be shown before animation starts.
       *  {Boolean}
       */
      isShowStart?: boolean

      /**
       *  If should be shown after animation ends.
       *  {Boolean}
       */
      isShowEnd?: boolean

      /**
       *  If refresh state on subsequent plays.
       *  {Boolean}
       */
      isRefreshState?: boolean

      /*
        Options for each children ShapeSwirl element. {Object}
        Supports `Stagger` strings for numeric values and `Property Maps` overall.
        see `Stagger Strings` and `Property Maps` section for more info.
      */
      children?: Omit<ShapeSwirlOptions, 'x' | 'y'>

      // Options for timeline that controls all child and main Shape Swirls. {Object}
      timeline?: TweenOptions
    }

    class Burst extends Tunable {
      constructor(opts: BurstOptions)
    }

    type StaggerValue = { [delta: string]: number | string }

    type ShapeStaggerOptions = StaggerOptions &
      {
        /**
         * exp: 'stagger(50)'
         * this means stagger with step of `50` starting from `0`
         * exp: 'stagger(-300, rand(100, 200))'
         * random value in range from `0` to staggered value (`200` for 1st module, `400` for 2nd, `600` for 3rd etc.)
         * property: stagger( start, step )
         */
        [k in keyof ShapeOptions]: string
      }

    // Module's properties and callbacks, depends on what module has been wrapped into stagger, please see wrapped module API reference.
    interface StaggerOptions {
      /**
       *  quantifier defines number of modules to create
       *  how many modules to create. {Number, String} [amount of modules, property name]
       *  if `string` is set instead of `number` it is treated as `property name` pointer - the number of modules will be inferred on value of that property, for instance if `quantifier` is set to `el` and `el` property has `array like` as it's value - quantifier will be set to length of that array.
       */
      quantifier: number | string

      // exp: [{ 0: 1 }, {0: 1.25}, { 0: 1.5 }, { 0: 2 }]
      // each module will receive value from this array.
      // if array is smaller than amount of modules (4 vs 5), the stagger prism will loop on the array,
      // thus `5th` item will receive value by `index = 0`, `6th` item will receive value by `index = 1` and so on.
      // This is called `property map` because it maps properties array to modules inside stagger.

      // exp: 'stagger(1, .25)'
      // the value of the property will be increased for each module with specified `step`(.25), starting from the `initial value`(1). Step could be `positive` or `negative`.

      // exp: { 0: 'stagger(1, .25)' },
      // animate scale from `0` to staggered value (`1` for 1st module, `1.25` for 2nd, `1.5` for 3rd etc.)
      scale?: string | StaggerValue | StaggerValue[]

      /**
       *  options for timeline that controls all modules
       */
      timeline?: TweenOptions
    }

    /* TWEEN CALLBACKS */
    interface TweenCallbacks {
      /**
       *  Fires on every update of the tween in any period (including delay periods). You probably want to use `onUpdate` method instead.
       *  @param p {Number} Normal (not eased) progress.
       *  @param isForward {Boolean} Direction of the progress.
       *  @param isYoyo {Boolean} If in `yoyo` period.
       */
      onProgress?: (
        progress: number,
        isForward?: boolean,
        isYoyo?: boolean
      ) => any

      /**
       *  Fires when tween's the progress reaches `0` point in normal or repeat period.
       *  @param isForward {Boolean} If progress moves in forward direction.
       *  @param isYoyo {Boolean} If progress inside `yoyo` flip period.
       */
      onStart?: (isForward: boolean, isYoyo: boolean) => any
      /**
       *  Fires when tween's the progress reaches `0` point in normal or repeat period.
       *  @param isForward {Boolean} If progress moves in forward direction.
       *  @param isYoyo {Boolean} If progress inside `yoyo` flip period.
       */
      onFirstUpdate?: (isForward, isYoyo) => any
      /**
       *  Fires on first update of the tween in sufficiently active period (excluding delay periods).
       *  @param ep {Number} Eased progress.
       *  @param p {Number} Normal (not eased) progress
       *  @param isForward {Boolean} Direction of the progress.
       *  @param isYoyo {Boolean} If in `yoyo` period.
       */
      onUpdate?: (ep, p, isForward, isYoyo) => any

      /**
       *  Fires when tween's the progress reaches `1` point in normal or repeat period.
       *  @param isForward {Boolean} If progress moves in forward direction.
       *  @param isYoyo {Boolean} If progress inside `yoyo` flip period.
       */
      onRepeatComplete?: (isForward, isYoyo) => any

      /**
       *  Fires when tween's the entire progress reaches `1` point(doesn't fire in repeat periods).
       *  @param isForward {Boolean} If progress moves in forward direction.
       *  @param isYoyo {Boolean} If progress inside `yoyo` flip period.
       */
      onComplete?: (isForward, isYoyo) => any

      /**
       *  Fires when the `.play` method called and tween isn't in play state yet.
       */
      onPlaybackStart?: () => any

      /**
       *  Fires when the `.pause` method called and tween isn't in pause state yet.
       */
      onPlaybackPause?: () => any

      /**
       *  Fires when the `.stop` method called and tween isn't in stop state yet.
       */
      onPlaybackStop?: () => any

      /**
       *  Fires when the tween end's animation (regardless progress)
       */
      onPlaybackComplete?: () => any
    }

    interface TweenOptions extends TweenCallbacks {
      /**
       *  Duration
       */
      duration?: number

      /**
       *  Delay
       */
      delay?: number

      /**
       *  If should repeat after animation finished
       *  {Number} *(1)
       */
      repeat?: number

      /**
       *  Speed of the tween
       *  {Number}
       *  [0..∞]
       */
      speed?: number

      /**
       *  If the progress should be flipped on repeat animation end
       *  {Boolean}
       */
      isYoyo?: boolean

      /**
       *  Easing function
       *  {String, Function}
       *  [ easing name, path coordinates, bezier string, easing function ]
       */
      easing?: EasingOption

      /**
       *  Easing function for backward direction of the tween animation (fallbacks to `easing`)
       *  {String, Function}
       *  [ easing name, path coordinates, bezier string, easing function ]
       */
      backwardEasing?: EasingOption

      /**
       *  Fires on every when progress needs an update. For instance when tween was finished an remains in
       *  `1` progress state, and you will play it again - it will stay in the `1` state until first sufficient
       *  update after delay. So the `onRefresh` callback serves you to `refresh` the `1` state with `0` update.
       *  @param isBefore {Boolean} If `true` - the refresh is before start time.
       */
      onRefresh?: (isBefore) => any
    }

    interface MotionPath {
      constructor(opts: any)

      run(any: any)

      run()
    }

    class Tween extends Module {
      constructor(opts?: TweenOptions)

      /**
       *  Starts playback.
       *  @param shift {Number} Start progress shift in milliseconds.
       */
      play(shift?: number)

      /**
       *  Starts playback in backward direction.
       *  @param shift {Number} Start progress shift in milliseconds.
       */
      playBackward(shift?: number)

      /**
       *  Pause
       *  */
      pause()

      /**
       *  Restarts playback.
       *  @param shift {Number} Start progress shift in milliseconds.
       *  */
      replay(shift?: number)

      /**
       *  Restarts playback in backward direction.
       *  @param shift {Number} Start progress shift in milliseconds.
       *  */
      replayBackward(shift?: number)

      /**
       *  Resumes playback in direction it was prior to `pause`.
       *  @param shift {Number} Start progress shift in milliseconds.
       *  */
      resume(shift?: number)

      /**
       *  Sets progress of the tween.
       *  @param progress {Number} Progress to set [ 0..1 ].
       *  */
      setProgress(progress)

      /**
       *  Sets speed of the tween.
       *  @param speed {Number} Progress to set [ 0..∞ ].
       *  */
      setSpeed(speed)

      /**
       *  Stops and resets the tween
       */
      reset()
    }

    export class Timeline extends Tween {
      constructor(opts?: TweenOptions)

      /**
       *  API method to add child tweens/timelines.
       *  @param tween {Object, Array} Tween/Timeline or an array of such.
       *  @param args
       *  @returns {Object} Self.
       */
      add(tween: Object | any, ...args)

      /**
       *  API method to append the Tween/Timeline to the end of the
       *  timeline. Each argument is treated as a new append.
       *  Array of tweens is treated as a parallel sequence.
       *  @param tween {Object, Array} Tween/Timeline to append or array of such.
       *  @returns {Object} Self.
       */
      append(tween: Object | any[])

      /**
       *  API method to stop the Tween.
       *  @param  progress {Number} Progress [0..1] to set when stopped.
       */
      stop(progress: number)

      /**
       *  Method to reset tween's state and properties.
       *  @overrides @ Tween
       *  @returns this
       */
      reset()
    }

    interface StaggeredConstructor<Module> extends ObjectConstructor {
      new (value?: StaggerOptions): Module

      (): Module

      (value?: StaggerOptions): Module
    }

    // stagger is a function not constructor! that wraps ANY module to create staggered animations.
    // You can treat stagger function as a prism is mounted on top of modules and splits input properties evenly between them:
    function stagger<Module = Object>(
      module: Shape | any
    ): StaggeredConstructor<Module>

    interface MojsStatic {
      CustomShape: ObjectConstructor

      addShape(name: string, shape: Shape)

      Timeline(): void

      Shape(shapeOptions: ShapeOptions): void

      easing: EasingOption
    }
  }
}

/**
 * EDITOR SHORTCUTS
 * alt + z - undo curve action
 * alt + x - redo curve action
 * alt + d - delete selected point(s)
 * [3 times] alt + \ - reset curve
 */
declare module '@mojs/curve-editor' {
  class MojsCurveEditor {
    constructor(opts: MojsCurveEditor.Options)
    constructor()

    // get `easing function` of the curve
    getEasing(p?: any)

    // maximize the curve editor
    maximize()

    // minimize the curve editor
    minimize()

    // toggle `maximize/minimize` methods regarding editor's state
    toggleSize()
  }

  namespace MojsCurveEditor {
    interface Options {
      // name of the curve editor
      name?: string
      // if should preserve state on page reloads
      isSaveState?: boolean

      // start path - will be loaded on initialization of the curve,
      // e.g. before any user modifications were made. Path of 'M0, 100 L100, 0' is set by default.
      startPath?: string

      // callback on path change, accepts path string
      onChange?: (path: string) => any

      // if should hide when minimized - useful when you try to embed
      isHiddenOnMin?: boolean
    }
  }

  export = MojsCurveEditor
}

/**
 * PLAYER SHORTCUTS
 * alt + p - toggle play/pause playback state
 * alt + - - decrease progress by 1/100
 * alt + + - increase progress by 1/100
 * shift + alt + - - decrease progress by 1/10
 * shift + alt + + - increase progress by 1/10
 * alt + s - stop playback
 * alt + r - toggle repeat state
 * alt + b - toggle bounds state
 * alt + h - toggle show/hide player state
 * alt + q - reset speed to 1x
 * alt + 2 - decrease speed by 1/50
 * alt + 3 - increase speed by 1/50
 * shift + alt + 2 - decrease speed by 1/10
 * shift + alt + 3 - increase speed by 1/10
 */
declare module '@mojs/player' {
  import { Timeline, Shape, Tween } from '@mojs/core'

  class MojsPlayer {
    constructor(opts: MojsPlayer.Options)
  }

  namespace MojsPlayer {
    interface Options {
      add: Timeline | Shape | Tween

      parent?: string | Object | HTMLElement

      /**
       *  class name to add to main HTMLElement
       */
      className?: string

      /**
       *  determines if should preserve state on page reload
       */
      isSaveState?: boolean

      /**
       *  playback state
       */
      isPlaying?: boolean

      /**
       *  initial progress
       */
      progress?: number

      /**
       *  determines if it should repeat after completion
       */
      isRepeat?: boolean

      /**
       *  determines if it should have bounds
       */
      isBounds?: boolean

      /**
       *  left bound position  [0...1]
       */
      leftBound?: number

      /**
       *  right bound position [0...1]
       */
      rightBound?: number

      /**
       *  determines if speed control should be open
       */
      isSpeed?: boolean

      /**
       *  speed value
       */
      speed?: number

      /**
       *  determines if the player should be hidden
       */
      isHidden?: boolean

      /**
       *  step size for player handle - for instance, after page reload -
       *  player should restore timeline progress - the whole timeline will be updated
       *  incrementally with the `precision` step size until the progress will be met.
       */
      precision?: number

      /**
       *  name for the player - mainly used for localstorage identifier,
       *  use to distinguish between multiple local players
       */
      name?: string

      // should be called after user taps on the hide-button (isHidden is a boolean, indicating the visibility state of the player)
      onToggleHide?: (isHidden) => void
    }
  }
  export = MojsPlayer
}
