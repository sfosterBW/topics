import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSum, getTotalSentiment } from '../Utils/helpers'
import { getTopics } from '../Utils/topics'

const TopicsContext = createContext()

export const TopicsProvider = (props) => {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [totalSentiment, setTotalSentiment] = useState()
  const [topics, setTopics] = useState()
  const [totalVolume, setTotalVolume] = useState()

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true)
        const data = await getTopics()
        setTopics(data)
        setTotalVolume(data
          .map(({ volume }) => volume)
          .reduce(getSum, 0)
        )
        setTotalSentiment({
          negative: getTotalSentiment(data, 'negative'),
          neutral: getTotalSentiment(data, 'neutral'),
          positive: getTotalSentiment(data, 'positive')
        })
        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    fetchTopics()
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
