import { storiesOf } from '@storybook/react'
import { MojsTimelineEditor } from './MojsTimelineEditor'
import { WithStage } from './examples/WithStage'

storiesOf('Example', module)
  .add('Default', () => <MojsTimelineEditor />)
  .add('With Player', () => <MojsTimelineEditor withPlayer />)
  .add('With A Stage', () => <WithStage />)
