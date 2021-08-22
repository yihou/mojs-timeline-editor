import { storiesOf } from '@storybook/react'
import { MojsTimelineEditor } from './MojsTimelineEditor'

storiesOf('Example', module)
  .add('Default', () => <MojsTimelineEditor />)
  .add('Without Player', () => <MojsTimelineEditor withPlayer={false} />)
