import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Sentiment from './sentiment'

const Word = ({ label, sentiment, sentimentScore, volume, weight }) => {
  const [visible, setVisible] = useState(false)

  if (!label || !sentiment || !sentimentScore || !volume || weight === undefined) {
    console.log(label, sentiment, sentimentScore, volume, weight)
    return null
  }

  const getColor = () => {
    if (sentimentScore > 60) {
      return 'green'
    }

    if (sentimentScore < 40) {
      return 'red'
    }

    return 'gray'
  }

  return (
    <>
      <li
        data-testid="word-in-cloud"
        style={{ color: getColor(), fontSize: `${weight / 2}rem` }}
        onClick={() => setVisible(prevState => !prevState)}
      >
        {label}
      </li>
      {visible &&
        <div className="modal">
          <button onClick={() => setVisible(false)}>&times;</button>
          <Sentiment label={label} sentiment={sentiment} volume={volume} />
        </div>
      }
    </>
  )
}

Word.propTypes = {
  label: PropTypes.string,
  sentiment: PropTypes.object,
  sentimentScore: PropTypes.number,
  volume: PropTypes.number,
  weight: PropTypes.number
}

export default Word
