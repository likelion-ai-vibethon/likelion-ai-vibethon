import { Router } from 'express'
import { rewriteResume } from '../services/gemini.js'

const router = Router()

router.post('/', async (req, res) => {
  const { resume, jd, emphasis } = req.body ?? {}

  if (!resume || !jd) {
    return res.status(400).json({ error: '자소서(resume)와 채용공고(jd)는 필수입니다.' })
  }

  try {
    const result = await rewriteResume({ resume, jd, emphasis })
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(502).json({ error: err.message })
  }
})

export default router
