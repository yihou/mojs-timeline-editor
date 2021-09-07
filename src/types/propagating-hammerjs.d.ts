declare module 'propagating-hammerjs' {
  type PropagatingInput = HammerInput & {
    stopPropagation(): void
    readonly firstTarget: any
  }

  interface PropagatingHammerListener {
    (event: PropagatingInput): void
  }

  export type PropagatedManager = {
    off(events: string, propagatedHandler?: PropagatingHammerListener): void
    on(events: string, propagatedHandler: PropagatingHammerListener): void
  } & HammerManager

  function propagating(manager: HammerManager): PropagatedManager

  // eslint-disable-next-line import/no-default-export
  export default propagating
}
