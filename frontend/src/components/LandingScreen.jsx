export default function LandingScreen({ onStart }) {
  return (
    <section className="screen landing">
      <h1>🎯 잡핏 (JobFit)</h1>
      <p className="tagline">채용공고에 맞춰 AI가 자소서를 재구성해드려요</p>
      <button type="button" onClick={onStart}>
        시작하기
      </button>
    </section>
  )
}
