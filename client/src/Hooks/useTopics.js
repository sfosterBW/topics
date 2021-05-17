import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getSum, getTotalSentiment, getWeights, shuffleArray } from '../Utils/helpers'
import { toTopics } from '../Utils/parser'
import { url } from '../Utils/consts'

const TopicsContext = createContext()

export const TopicsProvider = (props) => {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState()
  const [totalSentiment, setTotalSentiment] = useState()
  const [totalVolume, setTotalVolume] = useState()

  useEffect(() => {
    const source = axios.CancelToken.source()

    const fetchTopics = async () => {
      setLoading(true)
      setError()
      setTopics()
      setTotalSentiment()
      setTotalVolume()

      try {
        const groupingSize = 6
        const response = await axios.get(`${url}/topics`, { cancelToken: source.token })
        const rawData = toTopics(response.data)
        const weights = getWeights(rawData, 'volume', groupingSize)
        const data = rawData.map(topic => ({ ...topic, ...weights.find(({ id }) => id === topic.id) }))
        console.log(data)
        setTopics(shuffleArray(data))
        setTotalSentiment({
          negative: getTotalSentiment(data, 'negative'),
          neutral: getTotalSentiment(data, 'neutral'),
          positive: getTotalSentiment(data, 'positive')
        })
        setTotalVolume(data
          .filter(topic => topic.volume !== undefined)
          .map(topic => topic.volume)
          .reduce(getSum, 0)
        )
        setLoading(false)
      } catch (error) {
        if (axios.isCancel(error)) return
        setError(error)
        setLoading(false)
      }
    }
    fetchTopics()
    return () => source.cancel()
  }, [])

  return <TopicsContext.Provider value={{
    error,
    loading,
    topics,
    totalSentiment,
    totalVolume
  }} {...props} />
}

const useTopics = () => {
  const context = useContext(TopicsContext)

  if (context === undefined) {
    throw new Error('useTopics must be used with TopicsProvider')
  }

  return context
}

export default useTopics
