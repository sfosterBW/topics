import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Word from './word'

const label = 'test'
const negativeSentimentScore = 32
const neutralSentimentScore = 50
const positiveSentimentScore = 62
const sentiment = { negative: 1, neutral: 2, positive: 3 }
const volume = 10
const weight = 1

test('word does not render without props', () => {
  render(<Word label={label} />)

  const word = screen.queryByText(label)
  expect(word).not.toBeInTheDocument()
})

test('word is gray with neutral sentiment score', () => {
  render(
    <Word
      label={label}
      sentiment={sentiment}
      sentimentScore={neutralSentimentScore}
      volume={volume}
      weight={weight}
    />
  )

  const word = screen.queryByText(label)
  expect(word).toBeInTheDocument()
  expect(word).toHaveStyle({ color: 'gray', fontSize: '0.5rem' })
})

test('word is green with positive sentiment score', () => {
  render(
    <Word
      label={label}
      sentiment={sentiment}
      sentimentScore={positiveSentimentScore}
      volume={volume}
      weight={weight}
    />
  )

  const word = screen.queryByText(label)
  expect(word).toBeInTheDocument()
  expect(word).toHaveStyle({ color: 'green', fontSize: '0.5rem' })
})

test('word is green with negative sentiment score', () => {
  render(
    <Word
      label={label}
      sentiment={sentiment}
      sentimentScore={negativeSentimentScore}
      volume={volume}
      weight={weight}
    />
  )

  const word = screen.queryByText(label)
  expect(word).toBeInTheDocument()
  expect(word).toHaveStyle({ color: 'red', fontSize: '0.5rem' })
})

test('on click of word, modal renders with sentiment info', () => {
  render(
    <Word
      label={label}
      sentiment={sentiment}
      sentimentScore={neutralSentimentScore}
      volume={volume}
      weight={weight}
    />
  )
  const initSentimentTitle = screen.queryByText(/Information on topic/)
  expect(initSentimentTitle).not.toBeInTheDocument()

  const labelText = screen.getByText(label)

  userEvent.click(labelText)
  const sentimentTitle = screen.getByText(/Information on topic/)
  expect(sentimentTitle).toBeInTheDocument()

  userEvent.click(labelText)
  expect(sentimentTitle).not.toBeInTheDocument()
})
