import React from 'react'
import Word from '../Word/word'

import useTopics from '../../Hooks/useTopics'

import './wordcloud.css'

const WordCloud = () => {
  const { topics } = useTopics()

  if (!topics || !topics.length) {
    return <div>No topics</div>
  }

  return (
    <section className="wordcloud">
      <h2>Word cloud</h2>
      <div>
        <ul className="cloud">
          {topics.map(({ id, label, sentiment, sentimentScore, volume, weight }) =>
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
