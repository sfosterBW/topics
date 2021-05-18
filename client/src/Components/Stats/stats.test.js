/* eslint-disable jest/no-hooks */
import React from 'react'
import { render, screen } from '../../Utils/test-utils'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import data from '../../Utils/topics.json'

import Stats from './stats'

const totalSentiment = { negative: 1, neutral: 2, positive: 3 }
const totalVolume = 123

const server = setupServer(
  rest.get('http://localhost:3000/topics', (_req, res, ctx) => {
    return res(ctx.json(data.topics))
  })
)

describe('stats component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('stats does not render without totalSentiment or totalVolume', () => {
    expect.assertions(1)
    render(<Stats />)

    const title = screen.queryByText(/Total stats/)
    expect(title).not.toBeInTheDocument()
  })

  it('stats renders total sentiment and volume', async () => {
    expect.assertions(5)
    render(<Stats />, {
      value: {
        topics: data.topics,
        totalSentiment,
        totalVolume
      }
    })

    expect(await screen.findByText(/Total stats/)).toBeInTheDocument()
    expect(await screen.findByText(totalVolume)).toBeInTheDocument()
    expect(await screen.findByText(totalSentiment.negative)).toBeInTheDocument()
    expect(await screen.findByText(totalSentiment.neutral)).toBeInTheDocument()
    expect(await screen.findByText(totalSentiment.positive)).toBeInTheDocument()
  })
})
