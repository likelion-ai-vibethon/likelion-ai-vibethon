# 🎯 잡핏 (JobFit)

> **채용공고(JD) 맞춤형 AI 자소서 재구성 및 통합 관리 서비스**
> 
> *AI 바이브톤 6팀 프로젝트*

---

## 📌 프로젝트 소개 (Project Overview)

취업 준비생들은 하나의 자소서를 여러 기업의 채용공고에 맞추어 손수 각색하는 과정에서 막대한 시간과 피로감을 느낍니다. 대충 작성된 자소서는 결국 서류 탈락으로 이어집니다.

**잡핏(JobFit)**은 원문 자소서와 채용공고(JD) 텍스트만 입력하면, **AI가 공고의 핵심 인재상과 직무 키워드를 분석하여 맞춤형으로 자소서를 재구성**해주는 MVP 서비스입니다.

---

## ✨ 핵심 기능 (Key Features)

1. 🔍 **JD 키워드 추출 (JD Keyword Extraction)**
   - 채용공고(JD) 텍스트를 붙여넣으면 AI가 주요 인재상 및 필수 직무 키워드 자동 추출
2. 🤖 **AI 맞춤 첨삭 및 재구성 (AI Tailored Rewriting)**
   - 원문 자소서 + JD 키워드 + (선택) 강조하고 싶은 경험을 결합해 해당 기업에 최적화된 자소서 재구성
3. 🔄 **Before & After 비교 (Visual Comparison)**
   - 원문(읽기 전용)과 AI가 재구성한 결과물(직접 수정 가능)을 나란히 비교

> 오늘 MVP 범위: 로그인/저장 기능 없음. 모든 상태는 프론트 state로만 관리하며, 새로고침 시 초기화됩니다.

---

## 🛠 기술 스택 (Tech Stack)

- **Frontend:** React + Vite + Tailwind (`figma-make/`)
- **Backend:** Node.js + Express (`backend/`) — Gemini API 키를 서버에서만 보관하는 프록시 역할, 채용공고(URL) 크롤링 지원
- **AI Engine:** Google Gemini API (무료 티어, `google-genai` SDK)
- **Storage:** 없음 — 상태는 프론트 React state로만 관리 (오늘 MVP 범위)
- **Deployment:** 프론트엔드는 Vercel, 백엔드는 별도 배포 또는 로컬 실행
- **AI Assist Tools:** Claude Code, Cursor 등

---

## 🚀 실행 방법 (Getting Started)

**터미널 1 — 백엔드 (Node.js + Express)**

```bash
cd backend
npm install

cp .env.example .env
# .env 에 GEMINI_API_KEY 값 채우기 (https://aistudio.google.com/apikey 에서 발급)

npm run dev   # 파일 변경 감지 없이 바로 실행하려면: npm start
```

- `.env`의 `MOCK=true`로 설정하면 크롤링/AI 호출 없이 하드코딩된 예시 응답을 즉시 반환합니다 (데모 중 장애 대비용).

**터미널 2 — 프론트엔드 (Vite)**

```bash
cd figma-make
npm install
npm run dev
```

- 프론트엔드: http://localhost:8443
- 백엔드: http://localhost:4000 (프론트에서 `/api`로 프록시됨), 헬스체크: `GET /health`

---

## ☁️ Vercel 배포 (프론트엔드)

1. Vercel 대시보드 → New Project → 이 저장소 선택 (조직 저장소 연동이 안 되면 본인 계정으로 fork 후 진행)
2. **Root Directory**를 `figma-make`로 지정
3. 백엔드를 별도로 배포했다면, 프로젝트 환경변수에 `VITE_API_BASE=<배포된 백엔드 URL>` 추가
   - 백엔드를 배포하지 않고 로컬로 데모한다면 `VITE_API_BASE`를 로컬 백엔드가 접근 가능한 주소(터널링 등)로 설정
4. Deploy

백엔드(Node/Express)는 Render/Railway 등에 배포하거나, 시간이 없으면 로컬에서 `npm start`(포트는 `.env`의 `PORT`, 기본 4000)로 띄우고 데모해도 무방합니다.

---

## 🖥 화면 구성 (Screens)

1. **이력서 목록** — 저장된 이력서 목록 + [새 이력서 추가] (진입점, 랜딩 역할)
2. **AI 맞춤 첨삭** — 자소서 원문 / JD / 강조하고 싶은 경험(선택) 입력 → [AI 첨삭하기]
3. **AI 분석 결과** — 추출된 키워드, 매칭 점수, 요구 인재상 분석, Before(읽기 전용) / After(수정 가능) 비교
4. **저장 완료** — 첨삭 결과 저장 확인

## 🎬 시연 시나리오 (Demo Scenario)

1. **JD 입력:** 타겟 기업의 실제 채용공고 텍스트를 붙여넣습니다.
2. **AI 분석 및 재구성:** `AI 첨삭` 버튼 클릭 시, JD 핵심 키워드가 추출되며 맞춤형 자소서가 생성됩니다.
3. **비교 및 확인:** Before / After 화면을 통해 변환된 문장을 비교하고, After는 직접 다듬을 수 있습니다.

## 🔌 백엔드 API

**`POST /api/rewrite`**

```json
// Request
{ "resume": "자소서 원문", "jd": "채용공고 텍스트", "highlight": "강조하고 싶은 경험 (선택)" }

// Response
{
  "keywords": ["키워드1", "키워드2"],
  "talent_profile": "JD에서 확인되는 인재상 요약",
  "after": "재구성된 자소서 전체 텍스트",
  "mapping": [{ "keyword": "키워드1", "changed": "반영된 내용 설명" }],
  "match_score": 0,
  "score_breakdown": {
    "keyword_alignment": 0,
    "evidence_quality": 0,
    "job_relevance": 0,
    "writing_quality": 0,
    "company_consistency": 0
  },
  "length_penalty": 0
}
```

AI 호출/파싱이 끝내 실패하면 `502`와 `{ "error": "..." }`를 응답합니다.

**`POST /api/crawl`**

```json
// Request
{ "url": "사람인 채용공고 상세페이지 URL" }

// Response
{ "jd_text": "크롤링한 채용공고 본문", "success": true }
```

---

## 👥 팀원 및 역할 (Team)

| 이름 | 역할 | 담당 업무 |
| :---: | :---: | :--- |
| **윤혜민** | Product & PM | 회의 진행, 기획, 프론트-백엔드 연동, GITHUB & NOTION 관리 |
| **조희선** | Frontend | 메인 UI 개발 및 화면 컴포넌트 구성 |
| **손재원** | AI | 프롬프트 엔지니어링 및 기능 개발 |
| **권소윤** | Backend | 사람인 크롤링 및 MVP 구축 |

---

## 🏆 행사 안내 (Event Info)

- **행사명:** 멋쟁이사자처럼 AI 바이브톤 (AI Vibe-thon)
- **일시:** 2026년 9월 3일
- **주제:** AI를 활용해 일상 속 문제를 해결하는 디지털 서비스
