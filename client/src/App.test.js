import React from 'react'
import { render, screen } from './Utils/test-utils'

import App from './App'

import * as data from './Utils/topics.json'

describe('app component', () => {
  it('has a h1 that says My Topics Challenge', () => {
    expect.assertions(1)
    render(<App />, { value: data })

    const h1 = screen.getByText(/My Topics Challenge/i)
    expect(h1).toBeInTheDocument()
  })

  const totalSentiment = { negative: 100, neutral: 23456 }
  const totalVolume = 123

  it('displays the mentions', async () => {
    expect.assertions(8)
    render(<App />, {
      value: {
        topics: data.topics,
        totalSentiment,
        totalVolume
      }
    })

    const totalMentionLabel = await screen.findByText(/Total mentions:/i)
    const totalMentionCount = await screen.findByText(totalVolume)
    expect(totalMentionLabel).toBeInTheDocument()
    expect(totalMentionCount).toHaveTextContent(123)

    const positiveMentionLabel = await screen.findByText(/Positive mentions:/i)
    const positiveMentionCount = await screen.findByText(/N\/A/i)
    expect(positiveMentionLabel).toBeInTheDocument()
    expect(positiveMentionCount).toHaveTextContent('N/A')

    const neutralMentionLabel = await screen.findByText(/Neutral mentions:/i)
    const neutralMentionCount = await screen.findByText(totalSentiment.neutral)
    expect(neutralMentionLabel).toBeInTheDocument()
    expect(neutralMentionCount).toHaveTextContent(totalSentiment.neutral)

    const negativeMentionLabel = await screen.findByText(/Negative mentions:/i)
    const negativeMentionCount = await screen.findByText(totalSentiment.negative)
    expect(negativeMentionLabel).toBeInTheDocument()
    expect(negativeMentionCount).toHaveTextContent(totalSentiment.negative)
  })

  it('displays the wordcloud', async () => {
    expect.assertions(1)
    render(<App />, { value: data })

    const wordcloudLabel = await screen.findByText(/Word cloud/i)
    expect(wordcloudLabel).toBeInTheDocument()
  })
})
