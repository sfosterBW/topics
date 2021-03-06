import React from 'react'
import { render, screen } from '@testing-library/react'

import Sentiment from './sentiment'

const defaultSentiment = 'N/A'
const label = 'test'
const sentiment = { negative: 1, neutral: 2, positive: 3 }
const emptyNegativeSentiment = { neutral: 2, positive: 3 }
const emptyNeutralSentiment = { negative: 2, positive: 3 }
const emptyPositiveSentiment = { negative: 2, neutral: 3 }
const volume = 5

describe('sentiment component', () => {
  it('sentiment does not render without sentiment or volume', () => {
    expect.assertions(5)
    render(<Sentiment />)

    const topicInfo = screen.queryByText(/Information on topic/)
    const totalMentions = screen.queryByText(/Total mentions/)
    const negativeMentions = screen.queryByText(/Negative mentions/)
    const neutralMentions = screen.queryByText(/Neutral mentions/)
    const positiveMentions = screen.queryByText(/Positive mentions/)

    expect(topicInfo).not.toBeInTheDocument()
    expect(totalMentions).not.toBeInTheDocument()
    expect(negativeMentions).not.toBeInTheDocument()
    expect(neutralMentions).not.toBeInTheDocument()
    expect(positiveMentions).not.toBeInTheDocument()
  })

  it('sentiment does not render without sentiment', () => {
    expect.assertions(5)
    render(<Sentiment volume={volume} />)

    const topicInfo = screen.queryByText(/Information on topic/)
    const totalMentions = screen.queryByText(/Total mentions/)
    const negativeMentions = screen.queryByText(/Negative mentions/)
    const neutralMentions = screen.queryByText(/Neutral mentions/)
    const positiveMentions = screen.queryByText(/Positive mentions/)

    expect(topicInfo).not.toBeInTheDocument()
    expect(totalMentions).not.toBeInTheDocument()
    expect(negativeMentions).not.toBeInTheDocument()
    expect(neutralMentions).not.toBeInTheDocument()
    expect(positiveMentions).not.toBeInTheDocument()
  })

  it('sentiment does not render without volume', () => {
    expect.assertions(5)
    render(<Sentiment sentiment={sentiment} />)

    const topicInfo = screen.queryByText(/Information on topic/)
    const totalMentions = screen.queryByText(/Total mentions/)
    const negativeMentions = screen.queryByText(/Negative mentions/)
    const neutralMentions = screen.queryByText(/Neutral mentions/)
    const positiveMentions = screen.queryByText(/Positive mentions/)

    expect(topicInfo).not.toBeInTheDocument()
    expect(totalMentions).not.toBeInTheDocument()
    expect(negativeMentions).not.toBeInTheDocument()
    expect(neutralMentions).not.toBeInTheDocument()
    expect(positiveMentions).not.toBeInTheDocument()
  })

  it('sentiment renders without a label but with all the other fields', () => {
    expect.assertions(9)
    render(<Sentiment sentiment={sentiment} volume={volume} />)

    const topicInfo = screen.queryByText(/Information on topic/)
    expect(topicInfo).not.toBeInTheDocument()

    const totalMentions = screen.queryByText(/Total mentions/)
    const totalMentionsValue = screen.queryByText(volume)
    expect(totalMentions).toBeInTheDocument()
    expect(totalMentionsValue).toBeInTheDocument()

    const negativeMentions = screen.queryByText(/Negative mentions/)
    const negativeMentionsValue = screen.queryByText(sentiment.negative)
    expect(negativeMentions).toBeInTheDocument()
    expect(negativeMentionsValue).toBeInTheDocument()

    const neutralMentions = screen.queryByText(/Neutral mentions/)
    const neutralMentionsValue = screen.queryByText(sentiment.neutral)
    expect(neutralMentions).toBeInTheDocument()
    expect(neutralMentionsValue).toBeInTheDocument()

    const positiveMentions = screen.queryByText(/Positive mentions/)
    const positiveMentionsValue = screen.queryByText(sentiment.positive)
    expect(positiveMentions).toBeInTheDocument()
    expect(positiveMentionsValue).toBeInTheDocument()
  })

  it('sentiment renders with a label with all of the fields', () => {
    expect.assertions(10)
    render(<Sentiment label={label} sentiment={sentiment} volume={volume} />)

    const topicInfo = screen.queryByText(/Information on topic/)
    const topicInfoValue = screen.queryByText(label)
    expect(topicInfo).toBeInTheDocument()
    expect(topicInfoValue).toBeInTheDocument()

    const totalMentions = screen.queryByText(/Total mentions/)
    const totalMentionsValue = screen.queryByText(volume)
    expect(totalMentions).toBeInTheDocument()
    expect(totalMentionsValue).toBeInTheDocument()

    const negativeMentions = screen.queryByText(/Negative mentions/)
    const negativeMentionsValue = screen.queryByText(sentiment.negative)
    expect(negativeMentions).toBeInTheDocument()
    expect(negativeMentionsValue).toBeInTheDocument()

    const neutralMentions = screen.queryByText(/Neutral mentions/)
    const neutralMentionsValue = screen.queryByText(sentiment.neutral)
    expect(neutralMentions).toBeInTheDocument()
    expect(neutralMentionsValue).toBeInTheDocument()

    const positiveMentions = screen.queryByText(/Positive mentions/)
    const positiveMentionsValue = screen.queryByText(sentiment.positive)
    expect(positiveMentions).toBeInTheDocument()
    expect(positiveMentionsValue).toBeInTheDocument()
  })

  it('negative sentiment renders with na if no value is provided', () => {
    expect.assertions(2)
    render(<Sentiment label={label} sentiment={emptyNegativeSentiment} volume={volume} />)

    const negativeMentions = screen.queryByText(/Negative mentions/)
    const negativeMentionsValue = screen.queryByText(defaultSentiment)
    expect(negativeMentions).toBeInTheDocument()
    expect(negativeMentionsValue).toBeInTheDocument()
  })

  it('neutral sentiment renders with na if no value is provided', () => {
    expect.assertions(2)
    render(<Sentiment label={label} sentiment={emptyNeutralSentiment} volume={volume} />)

    const neutralMentions = screen.queryByText(/Neutral mentions/)
    const neutralMentionsValue = screen.queryByText(defaultSentiment)
    expect(neutralMentions).toBeInTheDocument()
    expect(neutralMentionsValue).toBeInTheDocument()
  })

  it('positive sentiment renders with na if no value is provided', () => {
    expect.assertions(2)
    render(<Sentiment label={label} sentiment={emptyPositiveSentiment} volume={volume} />)

    const positiveMentions = screen.queryByText(/Positive mentions/)
    const positiveMentionsValue = screen.queryByText(defaultSentiment)
    expect(positiveMentions).toBeInTheDocument()
    expect(positiveMentionsValue).toBeInTheDocument()
  })
})
