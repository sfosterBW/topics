import * as helper from './helpers'

const sentimentArray = [
  { negative: 1, neutral: 2, positive: 3 },
  { negative: 1, neutral: 2 },
  { negative: 1, positive: 3 },
  { neutral: 2, positive: 3 },
  { negative: 1 },
  { neutral: 2 },
  { positive: 3 },
  {}
]
const totalNegativeSentiment = 4
const totalNeutralSentiment = 8
const totalPositiveSentiment = 12
const sumArray = [1, 50, 32, 5]
const sumTotal = 88
const weightArray = [
  { id: '1', volume: 1 },
  { id: '2', volume: 100 },
  { id: '3', volume: 10 },
  { id: '4', volume: 3 },
  { id: '5', volume: 3 },
  { id: '6', volume: 5 }
]
const sortedWeightIds = [
  { id: '2', weight: 5 },
  { id: '3', weight: 4 },
  { id: '6', weight: 3 },
  { id: '4', weight: 2 },
  { id: '5', weight: 1 },
  { id: '1', weight: 0 }
]

describe('helper function', () => {
  it('getSum adds up', () => {
    expect.assertions(1)
    const total = sumArray.reduce(helper.getSum, 0)
    expect(total).toBe(sumTotal)
  })

  it('getTotal adds up', () => {
    expect.assertions(3)
    const negativeTotal = helper.getTotal(sentimentArray, 'negative')
    expect(negativeTotal).toBe(totalNegativeSentiment)

    const neutralTotal = helper.getTotal(sentimentArray, 'neutral')
    expect(neutralTotal).toBe(totalNeutralSentiment)

    const positiveTotal = helper.getTotal(sentimentArray, 'positive')
    expect(positiveTotal).toBe(totalPositiveSentiment)
  })

  it('getWeights returns weights', () => {
    expect.assertions(1)
    const weights = helper.getWeights(weightArray, 'volume', 6)
    expect(weights).toStrictEqual(sortedWeightIds)
  })
})
