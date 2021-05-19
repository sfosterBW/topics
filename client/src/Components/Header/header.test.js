import React from 'react'
import { render, screen } from '@testing-library/react'

import Header from './header'

describe('header component', () => {
  it('displays a title', () => {
    expect.assertions(1)
    const title = 'testing'
    render(<Header title={title} />)

    expect(screen.getByText(title)).toBeInTheDocument()
  })
})
