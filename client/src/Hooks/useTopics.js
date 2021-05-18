import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getTotal } from '../Utils/helpers'
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
        const response = await axios.get(`${url}/topics`, { cancelToken: source.token })
        const data = toTopics(response.data)
        setTopics(data)
        setTotalSentiment({
          negative: getTotal(data.map(({ sentiment }) => sentiment), 'negative'),
          neutral: getTotal(data.map(({ sentiment }) => sentiment), 'neutral'),
          positive: getTotal(data.map(({ sentiment }) => sentiment), 'positive')
        })
        setTotalVolume(getTotal(data, 'volume'))
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
