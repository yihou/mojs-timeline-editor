import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { TimelineEditor } from './TimelineEditor'

test('renders TimelineEditor', () => {
  render(<TimelineEditor />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
