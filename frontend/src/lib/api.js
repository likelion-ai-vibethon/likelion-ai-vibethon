export async function analyzeResume(resume, jd) {
  const res = await fetch('/api/rewrite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume, jd }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `요청이 실패했습니다 (${res.status})`)
  }

  const data = await res.json()
  // 백엔드 응답(keywords/talent_profile/after/mapping)을 기존 UI가 쓰는
  // 모양(keywords/rewritten)으로 맞춰준다.
  return { ...data, rewritten: data.after }
}
