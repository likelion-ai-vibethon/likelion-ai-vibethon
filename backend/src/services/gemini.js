import { SYSTEM_PROMPT, buildPrompt } from '../prompts.js'

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash'

function stripCodeFence(text) {
  let t = text.trim()
  if (t.startsWith('```')) {
    const lines = t.split('\n')
    lines.shift() // 첫 줄 ``` 또는 ```json 제거
    if (lines.length && lines[lines.length - 1].trim().startsWith('```')) {
      lines.pop()
    }
    t = lines.join('\n').trim()
  }
  return t
}

const SCORE_LIMITS = {
  keyword_alignment: 40,
  evidence_quality: 25,
  job_relevance: 20,
  writing_quality: 10,
  company_consistency: 5,
}

function toBoundedInteger(value, max) {
  const number = Number(value)
  if (!Number.isFinite(number)) return 0
  return Math.min(max, Math.max(0, Math.round(number)))
}

function normalizeRewriteResult(result, resume) {
  const after = typeof result?.after === 'string' && result.after.trim()
    ? result.after.trim()
    : resume
  const rawBreakdown = result?.score_breakdown ?? {}
  const scoreBreakdown = Object.fromEntries(
    Object.entries(SCORE_LIMITS).map(([key, max]) => [
      key,
      toBoundedInteger(rawBreakdown[key], max),
    ]),
  )
  const scoreSubtotal = Object.values(scoreBreakdown).reduce((sum, score) => sum + score, 0)
  const afterLength = after.replace(/\s/g, '').length
  const lengthPenalty = afterLength < 300 ? 10 : 0

  return {
    ...result,
    after,
    score_breakdown: scoreBreakdown,
    length_penalty: lengthPenalty,
    match_score: Math.max(0, scoreSubtotal - lengthPenalty),
  }
}

async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY가 설정되지 않았습니다. backend/.env를 확인하세요.')
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Gemini API 오류 (${res.status}): ${errText}`)
  }

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) {
    throw new Error('Gemini 응답에서 텍스트를 찾을 수 없습니다.')
  }
  return text
}

/**
 * resume/jd/highlight를 받아 Gemini를 호출하고 결과를 파싱해서 리턴한다.
 *
 * JSON 파싱 실패 시 백틱(코드펜스)을 벗기고 한 번 더 시도하고, 그래도
 * 실패하면 after에 원문 자소서를 그대로 넣은 결과를 리턴한다 (호출부에서
 * 항상 200으로 응답하기 위함).
 */
export async function rewriteResume({ resume, jd, highlight }) {
  const prompt = buildPrompt(resume, jd, highlight)

  let rawText = ''
  try {
    rawText = await callGemini(prompt)
    return normalizeRewriteResult(JSON.parse(rawText), resume)
  } catch {
    try {
      return normalizeRewriteResult(JSON.parse(stripCodeFence(rawText)), resume)
    } catch {
      return normalizeRewriteResult({
        keywords: [],
        talent_profile: '',
        after: resume,
        mapping: [],
      }, resume)
    }
  }
}
