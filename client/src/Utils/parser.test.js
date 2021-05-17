import * as parser from './parser'

const array = ['test', 1, 'this']
const number = 7
const object = { test: 'this', number: 1 }
const string = 'test'

// TODO: Add toTopic test
// TODO: Add toTopics test

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
})
