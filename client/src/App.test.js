import React from 'react'
import { render, screen } from './Utils/test-utils'
import App from './App'
import * as data from './Utils/topics.json'

test('has a h1 that says My Topics Challenge', () => {
  render(<App />, { values: data })

  const h1 = screen.getByText(/My Topics Challenge/i)
  expect(h1).toBeInTheDocument()
})

test('displays the mentions', () => {
  render(<App />, {
    values: {
      topics: data.topics,
      totalSentiment: { negative: 100, neutral: 23456 },
      totalVolume: 123
    }
  })

  const totalMentionLabel = screen.getByText(/Total mentions:/i)
  const totalMentionCount = screen.getByText(/123/i)
  expect(totalMentionLabel).toBeInTheDocument()
  expect(totalMentionCount).toHaveTextContent(123)

  const positiveMentionLabel = screen.getByText(/Positive mentions:/i)
  const positiveMentionCount = screen.getByText(/N\/A/i)
  expect(positiveMentionLabel).toBeInTheDocument()
  expect(positiveMentionCount).toHaveTextContent('N/A')

  const neutralMentionLabel = screen.getByText(/Neutral mentions:/i)
  const neutralMentionCount = screen.getByText(/23456/i)
  expect(neutralMentionLabel).toBeInTheDocument()
  expect(neutralMentionCount).toHaveTextContent(23456)

  const negativeMentionLabel = screen.getByText(/Negative mentions:/i)
  const negativeMentionCount = screen.getByText(/100/i)
  expect(negativeMentionLabel).toBeInTheDocument()
  expect(negativeMentionCount).toHaveTextContent(100)
})

test('displays the wordcloud', () => {
  render(<App />, { values: data })

  const wordcloudLabel = screen.getByText(/Word cloud/i)
  expect(wordcloudLabel).toBeInTheDocument()
})

// The label.property of each topic should be the 'word' in the word cloud
// https://stackoverflow.com/questions/57435680/whats-the-idiomatic-way-of-testing-a-list-with-dynamic-content-using-react-test
test.skip('The label.property of each topic should be the \'word\' in the word cloud', () => {
  // const {getAllByRole} = render(<App />);

  // const topics = getAllByRole('topic')
  // expect(topics).toHaveLength(data.topics.length)

  // data.topics.map(({label}) => expect(label).toBeInTheDocument())
})

// Each topic should have one of 6 different text sizes, with the most popular topics largest, and least popular smallest

// A topic with a sentiment score > 60 should be displayed in green

// A topic with a sentiment score < 40 should be displayed in red

// Other topics should be displayed in grey

// When a topic is clicked, metadata about the topic should be displayed (total volume, and how that breaks down into positive, neutral and negative sentiment)
