import React from 'react'
import { render, screen } from '../Utils/test-utils'
import WordCloud from './wordcloud'
import * as data from '../Utils/topics.json'

test('wordcloud does not render without topics', () => {
  render(<WordCloud />, {
    values: {
      topics: undefined
    }
  })

  const title = screen.queryByText(/No topics/)
  expect(title).toBeInTheDocument()
})

test('wordcloud renders list ordered by largest volume', () => {
  render(<WordCloud />, {
    values: {
      topics: data.topics
    }
  })

  const words = screen.getAllByTestId('word-in-cloud').map(li => li.textContent)
  const testWords = [...data.topics]
    .sort((curr, next) => curr.volume + next.volume)
    .map(({ label }) => label)
  expect(words).toEqual(testWords)
})
