import { getWeights } from './helpers'

const isString = (text) => {
  return typeof text === 'string' || text instanceof String
}

const parseArray = (array) => {
  if (!array || !Array.isArray(array)) {
    throw new Error(`Incorrect or missing an array ${JSON.stringify(array)}`)
  }

  return array
}

const parseId = (id) => {
  if (!id || !isString(id)) {
    throw new Error(`Incorrect or missing id: ${id}`)
  }

  return id
}

const parseLabel = (label) => {
  if (!label || !isString(label)) {
    throw new Error(`Incorrect or missing label: ${label}`)
  }
  return label
}

const parseSentimentScore = (sentimentScore) => {
  if (!sentimentScore || !Number.isInteger(Number(sentimentScore))) {
    throw new Error(`Incorrect or missing sentiment score: ${sentimentScore}`)
  }

  return sentimentScore
}

const parseVolume = (volume) => {
  if (!volume || !Number.isInteger(Number(volume))) {
    throw new Error(`Incorrect or missing volume: ${volume}`)
  }

  return volume
}

const parseNegative = (negative) => {
  if (negative === null || (negative && !Number.isInteger(Number(negative)))) {
    throw new Error(`Incorrect negative: ${negative}`)
  }

  return negative
}

const parseNeutral = (neutral) => {
  if (neutral === null || (neutral && !Number.isInteger(Number(neutral)))) {
    throw new Error(`Incorrect neutral: ${neutral}`)
  }

  return neutral
}

const parsePositive = (positive) => {
  if (positive === null || (positive && !Number.isInteger(Number(positive)))) {
    throw new Error(`Incorrect positive: ${positive}`)
  }

  return positive
}

const toTopic = (object) => {
  const topic = {
    id: parseId(object.id),
    label: parseLabel(object.label),
    sentiment: {
      negative: parseNegative(object.sentiment.negative),
      neutral: parseNeutral(object.sentiment.neutral),
      positive: parsePositive(object.sentiment.positive)
    },
    sentimentScore: parseSentimentScore(object.sentimentScore),
    volume: parseVolume(object.volume)
  }

  return topic
}

const toTopics = (array) => {
  const topicsArray = parseArray(array)
  const groupingSize = 6
  const weightByVolume = getWeights(topicsArray, 'volume', groupingSize)
  const weightedTopics = topicsArray.map(topic => ({
    ...toTopic(topic),
    weight: weightByVolume.find(({ id }) => id === topic.id).weight
  }))
  return weightedTopics
}

export {
  isString,
  parseArray,
  parseId,
  parseLabel,
  parseNegative,
  parseNeutral,
  parsePositive,
  parseSentimentScore,
  parseVolume,
  toTopic,
  toTopics
}
