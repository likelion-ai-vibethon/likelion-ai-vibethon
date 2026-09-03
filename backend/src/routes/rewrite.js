import { Router } from 'express'
import { rewriteResume } from '../services/gemini.js'
import { MOCK_REWRITE_RESPONSE } from '../mock.js'

const router = Router()
const MOCK = process.env.MOCK === 'true'

router.post('/', async (req, res) => {
  const { resume, jd, highlight } = req.body ?? {}

  if (MOCK) {
    return res.json(MOCK_REWRITE_RESPONSE)
  }

  if (!resume || !jd) {
    return res.status(400).json({ error: '자소서(resume)와 채용공고(jd)는 필수입니다.' })
  }

  // rewriteResume은 내부적으로 실패 시에도 항상 유효한 결과 객체를 리턴하므로
  // (JSON 파싱 실패 → after에 원문 그대로) 여기서는 항상 200으로 응답한다.
  const result = await rewriteResume({ resume, jd, highlight })
  res.json(result)
})

export default router
