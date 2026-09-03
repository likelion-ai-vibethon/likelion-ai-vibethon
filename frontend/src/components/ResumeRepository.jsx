export default function ResumeRepository({ resumes, selectedId, onSelect }) {
  return (
    <section className="panel">
      <h2>📂 자소서 저장소</h2>
      <ul className="resume-list">
        {resumes.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              className={r.id === selectedId ? 'resume-item active' : 'resume-item'}
              onClick={() => onSelect(r.id)}
            >
              {r.title}
              {r.company && <span className="badge">{r.company}용</span>}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
