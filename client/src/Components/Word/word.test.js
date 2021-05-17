import React from 'react'
import { render, screen, waitFor } from '../../Utils/test-utils'
import userEvent from '@testing-library/user-event'

import Word from './word'

const label = 'test'
const negativeSentimentScore = 32
const neutralSentimentScore = 50
const positiveSentimentScore = 62
const sentiment = { negative: 1, neutral: 2, positive: 3 }
const volume = 10
const weight = 1

describe('word component', () => {
  it('word does not render without props', async () => {
    expect.assertions(1)
    render(<Word label={label} />)

    const word = screen.queryByText(label)
    expect(word).not.toBeInTheDocument()
  })

  it('word is gray with neutral sentiment score', async () => {
    expect.assertions(2)
    render(
      <Word
        label={label}
        sentiment={sentiment}
        sentimentScore={neutralSentimentScore}
        volume={volume}
        weight={weight}
      />
    )

    const word = await screen.findByText(label)
    expect(word).toBeInTheDocument()
    expect(word).toHaveStyle({ color: 'gray', fontSize: '0.5rem' })
  })

  it('word is green with positive sentiment score', async () => {
    expect.assertions(2)
    render(
      <Word
        label={label}
        sentiment={sentiment}
        sentimentScore={positiveSentimentScore}
        volume={volume}
        weight={weight}
      />
    )

    const word = await screen.findByText(label)
    expect(word).toBeInTheDocument()
    expect(word).toHaveStyle({ color: 'green', fontSize: '0.5rem' })
  })

  it('word is green with negative sentiment score', async () => {
    expect.assertions(2)
    render(
      <Word
        label={label}
        sentiment={sentiment}
        sentimentScore={negativeSentimentScore}
        volume={volume}
        weight={weight}
      />
    )

    const word = await screen.findByText(label)
    expect(word).toBeInTheDocument()
    expect(word).toHaveStyle({ color: 'red', fontSize: '0.5rem' })
  })

  it('on click of word, modal renders with sentiment info', async () => {
    expect.assertions(3)
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

    await waitFor(() => {
      userEvent.click(labelText)
    })
    const sentimentTitle = await screen.findByText(/Information on topic/)
    expect(sentimentTitle).toBeInTheDocument()

    await waitFor(() => {
      userEvent.click(labelText)
    })
    const sentimentTitleUpdate = screen.queryByText(/Information on topic/)
    expect(sentimentTitleUpdate).not.toBeInTheDocument()
  })
})
