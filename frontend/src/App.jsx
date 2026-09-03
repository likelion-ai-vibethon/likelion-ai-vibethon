import { useState } from 'react'
import { rewriteResume } from './lib/api'
import LandingScreen from './components/LandingScreen'
import InputScreen from './components/InputScreen'
import ResultScreen from './components/ResultScreen'
import './App.css'

function App() {
  const [screen, setScreen] = useState('landing') // 'landing' | 'input' | 'result'
  const [originalResume, setOriginalResume] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit({ resume, jd, emphasis }) {
    setLoading(true)
    setError(null)
    try {
      const data = await rewriteResume({ resume, jd, emphasis })
      setOriginalResume(resume)
      setResult(data)
      setScreen('result')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleBack() {
    setResult(null)
    setError(null)
    setScreen('input')
  }

  return (
    <div className="app">
      {screen === 'landing' && <LandingScreen onStart={() => setScreen('input')} />}
      {screen === 'input' && (
        <InputScreen onSubmit={handleSubmit} loading={loading} error={error} />
      )}
      {screen === 'result' && (
        <ResultScreen original={originalResume} result={result} onBack={handleBack} />
      )}
    </div>
  )
}

export default App
