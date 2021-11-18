import { useEffect, useState } from 'react'
import { MojsTimelineEditor } from '../../MojsTimelineEditor'
import { MojsSimpleStage } from './MojsSimpleStage'

export const WithStage = () => {
  const [stage, setStage] = useState<undefined | MojsSimpleStage>(undefined)
  useEffect(() => {
    const parent = document.getElementById('root') as HTMLDivElement
    const stage = new MojsSimpleStage({
      parent
    })
    // eslint-disable-next-line dot-notation
    window['mojsTriangle'] = stage
    setStage(stage)
  }, [])

  return (
    <MojsTimelineEditor player={stage?.player} timeline={stage?.timeline} />
  )
}
