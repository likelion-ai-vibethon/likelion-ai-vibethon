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

  try {
    const result = await rewriteResume({ resume, jd, highlight })
    res.json(result)
  } catch (err) {
    res.status(502).json({ error: err.message })
  }
})

export default router
