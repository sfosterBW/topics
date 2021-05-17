import axios from 'axios'
import * as topics from './topics.json'

import * as topicService from './topics'
import { toTopics } from './parser'

jest.mock('axios')

describe('topics function', () => {
  it('fetches data', async () => {
    expect.assertions(1)
    const data = topics.topics
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }))

    await expect(topicService.getTopics()).resolves.toStrictEqual(toTopics(data))
  })

  it('fails when the api cannot be connected', async () => {
    expect.assertions(1)
    const errorMessage = 'Network Error'

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    )

    await expect(topicService.getTopics()).rejects.toThrow(errorMessage)
  })
})
