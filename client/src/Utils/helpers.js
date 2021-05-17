const getSum = (total, currentValue) => total + currentValue

const getTotalSentiment = (data, name) => {
  return data
    .map(topic => topic.sentiment[name] || undefined)
    .filter(field => field !== undefined)
    .reduce(getSum, 0)
}

// TODO: Add tests for getWeights
const getWeights = (array, field, groupingSize) => {
  return [...array]
    .sort((curr, next) => curr[field] + next[field])
    .map(({ id }, idx, arr) => ({
      id,
      weight: Math.floor(((arr.length - (idx + 1)) / arr.length) * groupingSize)
    }))
}

// TODO: Add tests for shuffle array
const shuffleArray = (unshuffledArray) => {
  const shuffledArray = unshuffledArray
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
  return shuffledArray
}

export { getSum, getTotalSentiment, getWeights, shuffleArray }
