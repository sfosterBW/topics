const getSum = (total, currentValue) => total + currentValue

const getTotal = (array, field) => {
  return array
    .map(i => i[field] || undefined)
    .filter(j => j !== undefined)
    .reduce(getSum, 0)
}

const getWeights = (array, field, groupingSize) => {
  return [...array]
    .sort((curr, next) => next[field] - curr[field])
    .map(({ id }, idx, arr) => ({
      id,
      weight: Math.floor(((arr.length - (idx + 1)) / arr.length) * groupingSize) // Split into equally sized groups
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

export { getSum, getTotal, getWeights, shuffleArray }
