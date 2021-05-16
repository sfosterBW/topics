import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { TopicsProvider } from './Hooks/useTopics'

ReactDOM.render(
  <React.StrictMode>
    <TopicsProvider>
      <App />
    </TopicsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
