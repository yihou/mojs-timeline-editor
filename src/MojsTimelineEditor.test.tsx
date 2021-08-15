import { MojsTimelineEditor } from './MojsTimelineEditor'
import ReactDOM from 'react-dom'

test('renders MojsTimelineEditor without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(MojsTimelineEditor, div)
  ReactDOM.unmountComponentAtNode(div)
})
