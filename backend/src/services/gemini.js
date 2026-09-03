const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash'

export async function rewriteResume({ resume, jd, emphasis }) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY가 설정되지 않았습니다. backend/.env를 확인하세요.')
  }

  const emphasisBlock = emphasis
    ? `\n[강조하고 싶은 경험]\n${emphasis}\n이 경험을 중심으로 재구성하세요.`
    : ''

  const prompt = `당신은 채용 자기소개서 첨삭 전문가입니다.
아래 채용공고(JD)를 분석해 핵심 키워드와 인재상을 추출하고,
자기소개서 원문을 해당 회사에 맞게 재구성하세요.

[채용공고]
${jd}

[자기소개서 원문]
${resume}
${emphasisBlock}

다음 JSON 형식으로만 응답하세요:
{
  "keywords": ["키워드1", "키워드2"],
  "draft": "재구성된 자기소개서 전체 텍스트"
}`

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
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

  return JSON.parse(text)
}
