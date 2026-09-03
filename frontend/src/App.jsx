import { useState } from 'react'
import { getResumes, saveResume } from './lib/storage'
import { analyzeResume } from './lib/api'
import ResumeRepository from './components/ResumeRepository'
import JDInputForm from './components/JDInputForm'
import CompareView from './components/CompareView'
import './App.css'

function App() {
  const [resumes, setResumes] = useState(getResumes())
  const [selectedId, setSelectedId] = useState(resumes[0]?.id ?? null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const selected = resumes.find((r) => r.id === selectedId)

  async function handleAnalyze(jd) {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzeResume(selected.content, jd)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSave(company) {
    const newResume = {
      id: `${Date.now()}`,
      title: `${company} 지원용 자소서`,
      company,
      content: result.rewritten,
    }
    const updated = saveResume(newResume)
    setResumes(updated)
    setSelectedId(newResume.id)
    setResult(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 잡핏 (JobFit)</h1>
        <p>채용공고에 맞춰 AI가 자소서를 재구성해드려요</p>
      </header>

      <main>
        <ResumeRepository resumes={resumes} selectedId={selectedId} onSelect={setSelectedId} />

        {selected && (
          <>
            <section className="panel">
              <h2>📄 원문 자소서</h2>
              <p>{selected.content}</p>
            </section>

            <JDInputForm onAnalyze={handleAnalyze} loading={loading} />
          </>
        )}

        {error && <p className="error-message">{error}</p>}

        <CompareView original={selected?.content} result={result} onSave={handleSave} />
      </main>
    </div>
  )
}

export default App
