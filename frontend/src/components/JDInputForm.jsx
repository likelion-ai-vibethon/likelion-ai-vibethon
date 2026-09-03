import { useState } from 'react'

export default function JDInputForm({ onAnalyze, loading }) {
  const [jd, setJd] = useState('')

  return (
    <section className="panel">
      <h2>🔍 채용공고(JD) 붙여넣기</h2>
      <textarea
        rows={10}
        placeholder="채용공고 텍스트를 여기에 붙여넣으세요"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />
      <button type="button" disabled={!jd.trim() || loading} onClick={() => onAnalyze(jd)}>
        {loading ? '분석 중...' : 'AI 첨삭'}
      </button>
    </section>
  )
}
