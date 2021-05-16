import React from 'react'
import Sentiment from './sentiment'
import useTopics from '../Hooks/useTopics'

const Stats = () => {
  const { totalSentiment, totalVolume } = useTopics()

  if (!totalSentiment || !totalVolume) {
    return null
  }

  return (
    <section className="stats">
      <h2>Total stats</h2>
      <Sentiment sentiment={totalSentiment} volume={totalVolume} />
    </section>
  )
}

export default Stats
