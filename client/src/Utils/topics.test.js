import axios from 'axios'
import * as topics from './topics.json'

import * as topicService from './topics'
import { toTopics } from './parser'

jest.mock('axios')

test('fetches data', async () => {
  const data = topics.topics
  axios.get.mockImplementationOnce(() => Promise.resolve({ data }))

  await expect(topicService.getTopics()).resolves.toEqual(toTopics(data))
})

test('fails when the api cannot be connected', async () => {
  const errorMessage = 'Network Error'

  axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error(errorMessage))
  )

  await expect(topicService.getTopics()).rejects.toThrow(errorMessage)
})
