import * as parser from './parser'

const array = ['test', 1, 'this']
const number = 7
const object = { test: 'this', number: 1 }
const string = 'test'

// TODO: Add toTopic test
// TODO: Add toTopics test

test('parse array', () => {
  expect(() => parser.parseArray(null)).toThrowError(/array/)
  expect(() => parser.parseArray(number)).toThrowError(/array/)
  expect(() => parser.parseArray(object)).toThrowError(/array/)
  expect(() => parser.parseArray(string)).toThrowError(/array/)
  expect(() => parser.parseArray(undefined)).toThrowError(/array/)

  expect(parser.parseArray(array)).toBe(array)
})

test('parse id', () => {
  expect(() => parser.parseId(array)).toThrowError(/id/)
  expect(() => parser.parseId(null)).toThrowError(/id/)
  expect(() => parser.parseId(number)).toThrowError(/id/)
  expect(() => parser.parseId(object)).toThrowError(/id/)
  expect(() => parser.parseId(undefined)).toThrowError(/id/)

  expect(parser.parseId(string)).toBe(string)
})

test('parse label', () => {
  expect(() => parser.parseLabel(array)).toThrowError(/label/)
  expect(() => parser.parseLabel(null)).toThrowError(/label/)
  expect(() => parser.parseLabel(number)).toThrowError(/label/)
  expect(() => parser.parseLabel(object)).toThrowError(/label/)
  expect(() => parser.parseLabel(undefined)).toThrowError(/label/)

  expect(parser.parseLabel(string)).toBe(string)
})

test('parse negative', () => {
  expect(() => parser.parseNegative(array)).toThrowError(/negative/)
  expect(() => parser.parseNegative(null)).toThrowError(/negative/)
  expect(() => parser.parseNegative(object)).toThrowError(/negative/)
  expect(() => parser.parseNegative(string)).toThrowError(/negative/)

  expect(parser.parseNegative(number)).toBe(number)
  expect(parser.parseNegative(undefined)).toBe(undefined)
})

test('parse neutral', () => {
  expect(() => parser.parseNeutral(array)).toThrowError(/neutral/)
  expect(() => parser.parseNeutral(null)).toThrowError(/neutral/)
  expect(() => parser.parseNeutral(object)).toThrowError(/neutral/)
  expect(() => parser.parseNeutral(string)).toThrowError(/neutral/)

  expect(parser.parseNeutral(number)).toBe(number)
  expect(parser.parseNeutral(undefined)).toBe(undefined)
})

test('parse positive', () => {
  expect(() => parser.parsePositive(array)).toThrowError(/positive/)
  expect(() => parser.parsePositive(null)).toThrowError(/positive/)
  expect(() => parser.parsePositive(object)).toThrowError(/positive/)
  expect(() => parser.parsePositive(string)).toThrowError(/positive/)

  expect(parser.parsePositive(number)).toBe(number)
  expect(parser.parsePositive(undefined)).toBe(undefined)
})

test('parse sentiment score', () => {
  expect(() => parser.parseSentimentScore(array)).toThrowError(/sentiment score/)
  expect(() => parser.parseSentimentScore(null)).toThrowError(/sentiment score/)
  expect(() => parser.parseSentimentScore(object)).toThrowError(/sentiment score/)
  expect(() => parser.parseSentimentScore(string)).toThrowError(/sentiment score/)
  expect(() => parser.parseSentimentScore(undefined)).toThrowError(/sentiment score/)

  expect(parser.parseSentimentScore(number)).toBe(number)
})

test('parse volume', () => {
  expect(() => parser.parseVolume(array)).toThrowError(/volume/)
  expect(() => parser.parseVolume(null)).toThrowError(/volume/)
  expect(() => parser.parseVolume(object)).toThrowError(/volume/)
  expect(() => parser.parseVolume(string)).toThrowError(/volume/)
  expect(() => parser.parseVolume(undefined)).toThrowError(/volume/)

  expect(parser.parseVolume(number)).toBe(number)
})
