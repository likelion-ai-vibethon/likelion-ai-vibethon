// 사람인(saramin.co.kr) 채용공고 상세페이지 크롤러.
//
// 1) fetch + cheerio 로 정적 HTML 파싱을 먼저 시도한다.
// 2) 본문(직무소개/자격요건/우대사항/인재상)이 잡히지 않으면 Puppeteer(headless
//    Chrome)로 페이지를 렌더링해서 다시 시도한다 (JS로 렌더되는 경우 대응).
//    Puppeteer는 실행 시 필요한 Chromium을 자동으로 관리한다.
//
// 최대한 단순하게: 특정 CSS 셀렉터에 의존하지 않고, 채용공고 본문이 들어있을
// 법한 컨테이너들을 훑어서 텍스트를 모으고, 그중 직무/자격요건/우대사항/인재상
// 관련 키워드가 포함된 블록만 추려 하나의 문자열로 합친다.

import * as cheerio from 'cheerio'

// 이 키워드들이 포함된 블록만 "채용공고 본문"으로 취급한다.
const SECTION_KEYWORDS = [
  '담당업무',
  '주요업무',
  '직무',
  '자격요건',
  '지원자격',
  '필수요건',
  '우대사항',
  '우대조건',
  '인재상',
  '핵심가치',
  '이런 분을 찾아요',
  '이런 분과 함께하고 싶어요',
]

// 최소 이 정도 길이는 되어야 "본문을 제대로 긁었다"고 판단한다.
const MIN_TEXT_LENGTH = 200

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const REQUEST_TIMEOUT_MS = 8000

const CANDIDATE_SELECTORS = [
  '.user_content',
  '.jv_cont',
  '.job_summary',
  '.company_view',
  '#content',
  '.wrap_jv_cont',
]

function extractTextFromHtml(html) {
  const $ = cheerio.load(html)

  // script/style/noscript 안의 내용은 cheerio가 그냥 텍스트로 취급해서
  // .text()에 그대로 딸려 나온다 (브라우저처럼 알아서 숨겨주지 않음).
  // JS 소스코드가 본문에 섞이는 걸 막기 위해 먼저 통째로 제거한다.
  $('script, style, noscript, iframe').remove()

  let blocks = []
  for (const selector of CANDIDATE_SELECTORS) {
    $(selector).each((_, el) => {
      const text = $(el).text().trim()
      if (text) blocks.push(text)
    })
  }

  // 후보 셀렉터로 못 찾았으면 페이지 전체에서 문단 단위(p, li, div, td, span)로 훑는다.
  if (blocks.length === 0) {
    const CONTAINER_TAGS = 'div, p, li, ul, ol, table, section, article, header, footer, nav'
    $('p, li, div, td, span, dd, dt').each((_, el) => {
      // 자식으로 블록 레벨 컨테이너(div/p/li/ul/ol/table 등)를 가진 요소는
      // 하위 요소들의 텍스트가 전부 이어붙은 "덩어리"라서, 페이지 상단의
      // 큰 wrapper div 하나가 페이지 전체 텍스트를 통째로 품는 등
      // 중복/노이즈 폭증의 원인이 된다. 그런 컨테이너는 건너뛰고 실제
      // 텍스트를 담고 있는 말단(leaf) 요소만 수집한다.
      if ($(el).children(CONTAINER_TAGS).length > 0) return
      const text = $(el).text().trim()
      if (text && text.length > 10) blocks.push(text)
    })
  }

  // 키워드가 포함된 블록만 남기되, 아무것도 안 걸리면 전체 텍스트라도 반환.
  const matched = blocks.filter((b) => SECTION_KEYWORDS.some((kw) => b.includes(kw)))
  const chosen = matched.length > 0 ? matched : blocks

  // 중복 제거 (순서 유지)
  const seen = new Set()
  const uniqueLines = []
  for (const block of chosen) {
    for (const rawLine of block.split('\n')) {
      const line = rawLine.replace(/\s+/g, ' ').trim()
      if (line && !seen.has(line)) {
        seen.add(line)
        uniqueLines.push(line)
      }
    }
  }

  return uniqueLines.join('\n')
}

async function crawlWithFetch(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const html = await res.text()
    return extractTextFromHtml(html)
  } finally {
    clearTimeout(timeout)
  }
}

async function crawlWithPuppeteer(url) {
  const { default: puppeteer } = await import('puppeteer')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    // Windows에서 백신 실시간 검사 등으로 Chrome 기동/CDP 응답이 느려지는
    // 경우가 있어서 기본 protocolTimeout(30s)보다 넉넉하게 잡는다.
    protocolTimeout: 60000,
    // 기본값(웹소켓)은 로컬 포트를 열어야 해서 방화벽/백신이 loopback
    // 트래픽을 막는 환경에서 CDP 통신 자체가 안 될 수 있다. pipe(stdio)
    // 방식은 포트를 안 열고 프로세스 파이프로만 통신해서 이 문제를 우회한다.
    pipe: true,
  })
  try {
    const page = await browser.newPage()
    await page.setUserAgent(USER_AGENT)
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 })
    const html = await page.content()
    return extractTextFromHtml(html)
  } finally {
    await browser.close()
  }
}

/**
 * 사람인 채용공고 URL에서 본문 텍스트를 최대한 긁어서 리턴한다.
 *
 * fetch+cheerio로 먼저 시도하고, 본문이 충분히 잡히지 않으면 Puppeteer
 * (headless Chrome)로 폴백한다. 완전히 실패하면 예외를 던진다 (호출부인
 * routes/crawl.js에서 잡아서 success: false로 응답한다).
 */
export async function crawlSaramin(url) {
  let text = ''
  try {
    text = await crawlWithFetch(url)
  } catch {
    text = ''
  }

  if (text.length < MIN_TEXT_LENGTH) {
    text = await crawlWithPuppeteer(url)
  }

  if (text.length < 20) {
    throw new Error('채용공고 본문을 찾지 못했습니다.')
  }

  return text
}
