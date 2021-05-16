import React from 'react'
import './App.css'
import WordCloud from './Components/wordcloud'
import Stats from './Components/stats'
import useTopics from './Hooks/useTopics'

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
