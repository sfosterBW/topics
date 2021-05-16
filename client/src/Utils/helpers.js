const getSum = (total, currentValue) => total + currentValue

const getTotalSentiment = (data, name) => {
  return data
    .map(({ sentiment }) => sentiment[name])
    .filter(sentiment => sentiment !== undefined)
    .reduce(getSum, 0)
}

export { getSum, getTotalSentiment }
