import React from 'react'
import { render, screen } from '../Utils/test-utils'
import Stats from './stats'

const totalSentiment = { negative: 1, neutral: 2, positive: 3 }
const totalVolume = 123

test('stats does not render without totalSentiment or totalVolume', () => {
  render(<Stats />)

  const title = screen.queryByText(/Total stats/)
  expect(title).not.toBeInTheDocument()
})

test('stats renders total sentiment and volume', () => {
  render(<Stats />, {
    values: {
      totalSentiment,
      totalVolume
    }
  })

  const volume = screen.queryByText(totalVolume)
  expect(volume).toBeInTheDocument()

  const negative = screen.queryByText(totalSentiment.negative)
  expect(negative).toBeInTheDocument()

  const neutral = screen.queryByText(totalSentiment.neutral)
  expect(neutral).toBeInTheDocument()

  const positive = screen.queryByText(totalSentiment.positive)
  expect(positive).toBeInTheDocument()
})
