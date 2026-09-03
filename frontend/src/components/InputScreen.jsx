import { useState } from 'react'

export default function InputScreen({ onSubmit, loading, error }) {
  const [resume, setResume] = useState('')
  const [jd, setJd] = useState('')
  const [emphasis, setEmphasis] = useState('')

  const canSubmit = resume.trim() && jd.trim() && !loading

  function handleSubmit() {
    if (!canSubmit) return
    onSubmit({ resume, jd, emphasis })
  }

  return (
    <section className="screen">
      <h1>🎯 잡핏 (JobFit)</h1>

      <div className="panel">
        <h2>📄 자소서 원문</h2>
        <textarea
          rows={10}
          placeholder="자소서 원문을 붙여넣으세요"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      </div>

      <div className="panel">
        <h2>🔍 채용공고(JD)</h2>
        <textarea
          rows={10}
          placeholder="채용공고 텍스트를 붙여넣으세요"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />
      </div>

      <div className="panel">
        <h2>✨ 강조하고 싶은 경험 (선택)</h2>
        <input
          type="text"
          placeholder="예: 팀 프로젝트에서 리드 경험"
          value={emphasis}
          onChange={(e) => setEmphasis(e.target.value)}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="button" disabled={!canSubmit} onClick={handleSubmit}>
        {loading ? '분석 중...' : 'AI 첨삭'}
      </button>
    </section>
  )
}
