import { useState, useEffect } from 'react'

export default function ResultScreen({ original, result, onBack }) {
  const [draft, setDraft] = useState(result?.draft ?? '')

  useEffect(() => {
    setDraft(result?.draft ?? '')
  }, [result])

  return (
    <section className="screen">
      <h1>🔄 첨삭 결과</h1>

      {result?.keywords?.length > 0 && (
        <div className="panel">
          <h2>추출된 키워드 · 인재상</h2>
          <div className="keywords">
            {result.keywords.map((k) => (
              <span key={k} className="keyword-chip">
                {k}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="compare-grid">
        <div className="panel">
          <h3>Before (원문)</h3>
          <p className="readonly-text">{original}</p>
        </div>
        <div className="panel">
          <h3>After (수정 가능)</h3>
          <textarea rows={14} value={draft} onChange={(e) => setDraft(e.target.value)} />
        </div>
      </div>

      <button type="button" onClick={onBack}>
        다시 입력하기
      </button>
    </section>
  )
}
