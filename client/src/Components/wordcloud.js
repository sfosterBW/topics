import React from 'react'
import Word from './word'

import useTopics from '../Hooks/useTopics'

const WordCloud = () => {
  const { topics } = useTopics()

  if (!topics || !topics.length) {
    return <div>No topics</div>
  }

  const groupingSize = 6

  const getWords = () => {
    // TODO: Move weighting to topics hook
    const wordcloudTopics = [...topics].sort((curr, next) => curr.volume + next.volume).map((topic, idx, arr) => ({
      ...topic,
      weight: Math.floor(((arr.length - (idx + 1)) / arr.length) * groupingSize)
    }))

    return wordcloudTopics
  }

  return (
    <section>
      <h2>Word cloud</h2>
      <div>
        <ul className="cloud">
          {getWords().map(({ id, label, sentiment, sentimentScore, volume, weight }) =>
            <Word
              key={id}
              label={label}
              sentiment={sentiment}
              sentimentScore={sentimentScore}
              volume={volume}
              weight={weight}
            />
          )}
        </ul>
      </div>
    </section>
  )
}

export default WordCloud
