import { Router } from 'express'
import { crawlSaramin } from '../services/crawler.js'
import { MOCK_JD_TEXT } from '../mock.js'

const router = Router()
const MOCK = process.env.MOCK === 'true'

router.post('/', async (req, res) => {
  const { url } = req.body ?? {}

  if (MOCK) {
    return res.json({ jd_text: MOCK_JD_TEXT, success: true })
  }

  if (!url) {
    return res.status(400).json({ jd_text: '', success: false })
  }

  try {
    const jdText = await crawlSaramin(url)
    res.json({ jd_text: jdText, success: true })
  } catch (err) {
    console.error(err)
    // 크롤링 실패(구조 변경, 타임아웃, 403 등) 시 500 대신 success:false로 응답
    res.json({ jd_text: '', success: false })
  }
})

export default router
