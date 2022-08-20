import { render, screen } from '@testing-library/react'
import { HomePage } from '../../pages/HomePage'

test('renders hello world message', () => {
  render(<HomePage />)
  const gm = screen.getByText(/gm/i)
  expect(gm).toBeInTheDocument()
})
