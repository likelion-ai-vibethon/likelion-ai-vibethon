const API_BASE = import.meta.env.VITE_API_BASE || ''

export async function rewriteResume({ resume, jd, emphasis }) {
  const res = await fetch(`${API_BASE}/api/rewrite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume, jd, emphasis }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || body.error || `요청이 실패했습니다 (${res.status})`)
  }

  return res.json()
}
