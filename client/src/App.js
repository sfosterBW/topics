import React from 'react'

import Header from './Components/Header/header'
import WordCloud from './Components/Wordcloud/wordcloud'
import Stats from './Components/Stats/stats'

import useTopics from './Hooks/useTopics'

import './App.css'

const App = () => {
  const { error, loading } = useTopics()

  return (
    <div className="App">
      <Header title="My Topics Challenge" />
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
