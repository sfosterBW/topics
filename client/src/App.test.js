/* eslint-disable jest/no-hooks */
import React from 'react'
import { render, screen } from './Utils/test-utils'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import App from './App'

import data from './Utils/topics.json'

const totalSentiment = { negative: 100, neutral: 23456 }
const totalVolume = 123

const server = setupServer(
  rest.get('http://localhost:3000/topics', (_req, res, ctx) => {
    return res(ctx.json(data.topics))
  })
)

describe('app component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('has a h1 that says My Topics Challenge', () => {
    expect.assertions(1)
    render(<App />)

    const h1 = screen.getByText(/My Topics Challenge/i)
    expect(h1).toBeInTheDocument()
  })

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
