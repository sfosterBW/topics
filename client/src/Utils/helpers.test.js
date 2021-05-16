import * as helper from './helpers'

const sentimentArray = [
  { sentiment: { negative: 1, neutral: 2, positive: 3 } },
  { sentiment: { negative: 1, neutral: 2 } },
  { sentiment: { negative: 1, positive: 3 } },
  { sentiment: { neutral: 2, positive: 3 } },
  { sentiment: { negative: 1 } },
  { sentiment: { neutral: 2 } },
  { sentiment: { positive: 3 } },
  { sentiment: {} }
]
const totalNegativeSentiment = 4
const totalNeutralSentiment = 8
const totalPositiveSentiment = 12
const sumArray = [1, 50, 32, 5]
const sumTotal = 88

test('getSum adds up', () => {
  const total = sumArray.reduce(helper.getSum, 0)
  expect(total).toBe(sumTotal)
})

test('getSentiment adds up', () => {
  const negativeTotal = helper.getTotalSentiment(sentimentArray, 'negative')
  expect(negativeTotal).toBe(totalNegativeSentiment)

  const neutralTotal = helper.getTotalSentiment(sentimentArray, 'neutral')
  expect(neutralTotal).toBe(totalNeutralSentiment)

  const positiveTotal = helper.getTotalSentiment(sentimentArray, 'positive')
  expect(positiveTotal).toBe(totalPositiveSentiment)
})
