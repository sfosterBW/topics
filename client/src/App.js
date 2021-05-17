import React from 'react'
import WordCloud from './Components/Wordcloud/wordcloud'
import Stats from './Components/Stats/stats'

import useTopics from './Hooks/useTopics'

import './App.css'

const App = () => {
  const { error, loading } = useTopics()

  return (
    <div className="App">
      <header>
        <h1>My Topics Challenge</h1>
      </header>
      {loading && <div>Loading...</div>}
      {error && <div>{String(error)}</div>}
      <main>
        <WordCloud />
        <Stats />
      </main>
    </div>
  )
}

export default App
