/* eslint-disable jest/no-hooks */
import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import useTopics, { TopicsProvider } from './useTopics'
import { toTopics } from '../Utils/parser'
import data from '../Utils/topics.json'

const value = {
  error: undefined,
  loading: false,
  topics: data.topics,
  totalVolume: 489,
  totalSentiment: { negative: 33, neutral: 385, positive: 71 }
}

const processedTopics = toTopics(data.topics)

const server = setupServer(
  rest.get('http://localhost:3000/topics', (_req, res, ctx) => {
    return res(ctx.json(data.topics))
  })
)

describe('useTopics', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('throws and error without a provider', () => {
    expect.assertions(1)
    const { result } = renderHook(() => useTopics())
    expect(result.error).toStrictEqual(Error('useTopics must be used with TopicsProvider'))
  })

  it('generates error when it cannot connect', async () => {
    expect.assertions(5)
    server.use(
      rest.get('http://localhost:3000/topics', (_req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const wrapper = ({ children }) => <TopicsProvider>{children}</TopicsProvider>
    const { result, waitForNextUpdate } = renderHook(() => useTopics(), { wrapper })

    await waitForNextUpdate()

    expect(result.current.error).toStrictEqual(Error('Request failed with status code 500'))
    expect(result.current.loading).toStrictEqual(false)
    expect(result.current.topics).toBeUndefined()
    expect(result.current.totalVolume).toBeUndefined()
    expect(result.current.totalSentiment).toBeUndefined()
  })

  it('values are set in the provider', () => {
    expect.assertions(5)
    const wrapper = (props) => <TopicsProvider value={value} {...props} />
    const { result } = renderHook(() => useTopics(), { wrapper })

    expect(result.current.error).toStrictEqual(value.error)
    expect(result.current.loading).toStrictEqual(value.loading)
    expect(result.current.topics).toStrictEqual(value.topics)
    expect(result.current.totalVolume).toStrictEqual(value.totalVolume)
    expect(result.current.totalSentiment).toStrictEqual(value.totalSentiment)
  })

  it('gets data as expectd', async () => {
    expect.assertions(5)
    const wrapper = ({ children }) => <TopicsProvider>{children}</TopicsProvider>
    const { result, waitForNextUpdate } = renderHook(() => useTopics(), { wrapper })

    await waitForNextUpdate()

    expect(result.current.error).toStrictEqual(value.error)
    expect(result.current.loading).toStrictEqual(value.loading)
    expect(result.current.topics).toStrictEqual(processedTopics)
    expect(result.current.totalVolume).toStrictEqual(value.totalVolume)
    expect(result.current.totalSentiment).toStrictEqual(value.totalSentiment)
  })
})
