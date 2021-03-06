import * as parser from './parser'
import data from './topics.json'

const array = ['test', 1, 'this']
const number = 7
const object = { test: 'this', number: 1 }
const string = 'test'

describe('parser function', () => {
  it('parse array', () => {
    expect.assertions(6)
    expect(() => parser.parseArray(null)).toThrow(/array/)
    expect(() => parser.parseArray(number)).toThrow(/array/)
    expect(() => parser.parseArray(object)).toThrow(/array/)
    expect(() => parser.parseArray(string)).toThrow(/array/)
    expect(() => parser.parseArray(undefined)).toThrow(/array/)

    expect(parser.parseArray(array)).toBe(array)
  })

  it('parse id', () => {
    expect.assertions(6)
    expect(() => parser.parseId(array)).toThrow(/id/)
    expect(() => parser.parseId(null)).toThrow(/id/)
    expect(() => parser.parseId(number)).toThrow(/id/)
    expect(() => parser.parseId(object)).toThrow(/id/)
    expect(() => parser.parseId(undefined)).toThrow(/id/)

    expect(parser.parseId(string)).toBe(string)
  })

  it('parse label', () => {
    expect.assertions(6)
    expect(() => parser.parseLabel(array)).toThrow(/label/)
    expect(() => parser.parseLabel(null)).toThrow(/label/)
    expect(() => parser.parseLabel(number)).toThrow(/label/)
    expect(() => parser.parseLabel(object)).toThrow(/label/)
    expect(() => parser.parseLabel(undefined)).toThrow(/label/)

    expect(parser.parseLabel(string)).toBe(string)
  })

  it('parse negative', () => {
    expect.assertions(6)
    expect(() => parser.parseNegative(array)).toThrow(/negative/)
    expect(() => parser.parseNegative(null)).toThrow(/negative/)
    expect(() => parser.parseNegative(object)).toThrow(/negative/)
    expect(() => parser.parseNegative(string)).toThrow(/negative/)

    expect(parser.parseNegative(number)).toBe(number)
    expect(parser.parseNegative(undefined)).toBeUndefined()
  })

  it('parse neutral', () => {
    expect.assertions(6)
    expect(() => parser.parseNeutral(array)).toThrow(/neutral/)
    expect(() => parser.parseNeutral(null)).toThrow(/neutral/)
    expect(() => parser.parseNeutral(object)).toThrow(/neutral/)
    expect(() => parser.parseNeutral(string)).toThrow(/neutral/)

    expect(parser.parseNeutral(number)).toBe(number)
    expect(parser.parseNeutral(undefined)).toBeUndefined()
  })

  it('parse positive', () => {
    expect.assertions(6)
    expect(() => parser.parsePositive(array)).toThrow(/positive/)
    expect(() => parser.parsePositive(null)).toThrow(/positive/)
    expect(() => parser.parsePositive(object)).toThrow(/positive/)
    expect(() => parser.parsePositive(string)).toThrow(/positive/)

    expect(parser.parsePositive(number)).toBe(number)
    expect(parser.parsePositive(undefined)).toBeUndefined()
  })

  it('parse sentiment score', () => {
    expect.assertions(6)
    expect(() => parser.parseSentimentScore(array)).toThrow(/sentiment score/)
    expect(() => parser.parseSentimentScore(null)).toThrow(/sentiment score/)
    expect(() => parser.parseSentimentScore(object)).toThrow(/sentiment score/)
    expect(() => parser.parseSentimentScore(string)).toThrow(/sentiment score/)
    expect(() => parser.parseSentimentScore(undefined)).toThrow(/sentiment score/)

    expect(parser.parseSentimentScore(number)).toBe(number)
  })

  it('parse volume', () => {
    expect.assertions(6)
    expect(() => parser.parseVolume(array)).toThrow(/volume/)
    expect(() => parser.parseVolume(null)).toThrow(/volume/)
    expect(() => parser.parseVolume(object)).toThrow(/volume/)
    expect(() => parser.parseVolume(string)).toThrow(/volume/)
    expect(() => parser.parseVolume(undefined)).toThrow(/volume/)

    expect(parser.parseVolume(number)).toBe(number)
  })

  it('toTopic turns an object into a topic', () => {
    expect.assertions(11)

    expect(parser.toTopic(data.topics[0]).burst).toBeUndefined()
    expect(parser.toTopic(data.topics[0]).days).toBeUndefined()
    expect(parser.toTopic(data.topics[0]).pageType).toBeUndefined()
    expect(parser.toTopic(data.topics[0]).queries).toBeUndefined()
    expect(parser.toTopic(data.topics[0]).type).toBeUndefined()
    expect(parser.toTopic(data.topics[0]).weigth).toBeUndefined()

    expect(parser.toTopic(data.topics[0]).id).toStrictEqual(data.topics[0].id)
    expect(parser.toTopic(data.topics[0]).label).toStrictEqual(data.topics[0].label)
    expect(parser.toTopic(data.topics[0]).sentiment).toStrictEqual(data.topics[0].sentiment)
    expect(parser.toTopic(data.topics[0]).sentimentScore).toStrictEqual(data.topics[0].sentimentScore)
    expect(parser.toTopic(data.topics[0]).volume).toStrictEqual(data.topics[0].volume)
  })

  it('toTopic throws an error if there is a missing id', () => {
    expect.assertions(1)

    const { id, ...topicWithoutId } = data.topics[0]

    expect(() => parser.toTopic(topicWithoutId)).toThrow(Error('Incorrect or missing id: undefined'))
  })

  it('toTopics turns an array of objects into an array of topics', () => {
    expect.assertions(1)
    const topics = parser.toTopics(data.topics)

    expect(topics).toHaveLength(data.topics.length)
  })

  it('toTopics adds weighting based on the array', () => {
    expect.assertions(3)
    const weights = parser.toTopics(data.topics).map(({ weight }) => weight)

    expect(weights).toHaveLength(data.topics.length)
    expect(Math.max(...weights)).toStrictEqual(5)
    expect(Math.min(...weights)).toStrictEqual(0)
  })
})
