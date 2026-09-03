import { useState } from 'react'

export default function CompareView({ original, result, onSave }) {
  const [company, setCompany] = useState('')

  if (!result) return null

  return (
    <section className="panel">
      <h2>🔄 Before / After 비교</h2>

      {result.keywords?.length > 0 && (
        <div className="keywords">
          {result.keywords.map((k) => (
            <span key={k} className="keyword-chip">
              {k}
            </span>
          ))}
        </div>
      )}

      <div className="compare-grid">
        <div>
          <h3>Before</h3>
          <p>{original}</p>
        </div>
        <div>
          <h3>After</h3>
          <p>{result.rewritten}</p>
        </div>
      </div>

      <div className="save-row">
        <input
          placeholder="기업명 (예: 네이버)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <button type="button" disabled={!company.trim()} onClick={() => onSave(company)}>
          이 버전으로 저장
        </button>
      </div>
    </section>
  )
}
