import React from 'react'
import PropTypes from 'prop-types'

import './sentiment.css'

const Sentiment = ({ label, sentiment, volume }) => {
  if (!sentiment || !volume) {
    return null
  }

  return (
    <div className="sentiment-content">
      {label &&
        <div>
          <h3>Information on topic:</h3>
          <p>{label}</p>
        </div>
      }
      <div>
        <h3>Total mentions:</h3>
        <p>{volume}</p>
      </div>
      <div>
        <h3>Positive mentions:</h3>
        <p style={{ color: 'green' }}>{sentiment.positive || 'N/A'}</p>
      </div>
      <div>
        <h3>Neutral mentions:</h3>
        <p style={{ color: 'gray' }}>{sentiment.neutral || 'N/A'}</p>
      </div>
      <div>
        <h3>Negative mentions:</h3>
        <p style={{ color: 'red' }}>{sentiment.negative || 'N/A'}</p>
      </div>
    </div>
  )
}

Sentiment.propTypes = {
  label: PropTypes.string,
  sentiment: PropTypes.object,
  volume: PropTypes.number
}

export default Sentiment
