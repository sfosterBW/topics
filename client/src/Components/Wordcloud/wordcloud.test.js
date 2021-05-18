import React from 'react'
import { render, screen } from '../../Utils/test-utils'

import WordCloud from './wordcloud'

import * as data from '../../Utils/topics.json'

describe('wordcloud component', () => {
  it('wordcloud does not render without topics', async () => {
    expect.assertions(1)
    render(<WordCloud />, {
      value: {
        topics: undefined
      }
    })

    const title = await screen.findByText(/No topics/)
    expect(title).toBeInTheDocument()
  })

  it('wordcloud renders list ordered by largest volume', () => {
    expect.assertions(1)
    render(<WordCloud />, {
      value: {
        topics: data.topics.map(topic => ({ ...topic, weight: 1 }))
      }
    })

    const words = screen.queryAllByTestId('word-in-cloud').map(li => li.textContent)
    const testWords = data.topics.map(({ label }) => label)
    expect(words).toStrictEqual(testWords)
  })
})
