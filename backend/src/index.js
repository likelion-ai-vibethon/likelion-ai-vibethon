import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import analyzeRouter from './routes/analyze.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/health', (req, res) => res.json({ ok: true }))
app.use('/api/analyze', analyzeRouter)

app.listen(PORT, () => {
  console.log(`잡핏 백엔드 서버 실행 중: http://localhost:${PORT}`)
})
