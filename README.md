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

- **Frontend:** React + Vite (`frontend/`)
- **Backend:** Node.js + Express (`backend/`) — Gemini API 키를 서버에서만 보관하는 프록시 역할
- **AI Engine:** Google Gemini API (무료 티어)
- **Storage:** 없음 — 상태는 프론트 React state로만 관리 (오늘 MVP 범위)
- **Deployment:** 프론트엔드는 Vercel, 백엔드는 별도 배포 또는 로컬 실행
- **AI Assist Tools:** Claude Code, Cursor 등

> 백엔드는 기존에 구축된 Node.js/Express를 그대로 사용합니다 (FastAPI 재작성은 오늘 일정상 보류).

---

## 🚀 실행 방법 (Getting Started)

```bash
# 1. 의존성 설치 (루트에서 한 번에)
npm install
npm run install:all

# 2. 백엔드 환경변수 설정
cp backend/.env.example backend/.env
# backend/.env 에 GEMINI_API_KEY 값 채우기 (https://aistudio.google.com/apikey 에서 발급)

# 3. 프론트 + 백엔드 동시 실행
npm run dev
```

- 프론트엔드: http://localhost:5173
- 백엔드: http://localhost:4000 (프론트에서 `/api`로 프록시됨)

---

## ☁️ Vercel 배포 (프론트엔드)

1. Vercel 대시보드 → New Project → 이 저장소 선택 (조직 저장소 연동이 안 되면 본인 계정으로 fork 후 진행)
2. **Root Directory**를 `frontend`로 지정
3. 백엔드를 별도로 배포했다면, 프로젝트 환경변수에 `VITE_API_BASE=<배포된 백엔드 URL>` 추가
   - 백엔드를 배포하지 않고 로컬로 데모한다면 `VITE_API_BASE`를 로컬 백엔드가 접근 가능한 주소(터널링 등)로 설정
4. Deploy

백엔드(Express)는 Render/Railway 등에 배포하거나, 시간이 없으면 로컬에서 `npm run dev --prefix backend`로 띄우고 데모해도 무방합니다. 이 경우 백엔드 `.env`의 `FRONTEND_ORIGIN`에 배포된 프론트 도메인을 추가해야 CORS가 통과합니다.

---

## 🖥 화면 구성 (Screens)

1. **랜딩** — 서비스 소개 + [시작하기] 버튼
2. **입력** — 자소서 원문 / JD / 강조하고 싶은 경험(선택) 입력 → [AI 첨삭]
3. **결과** — 추출된 키워드, Before(읽기 전용) / After(수정 가능) 비교

## 🎬 시연 시나리오 (Demo Scenario)

1. **JD 입력:** 타겟 기업의 실제 채용공고 텍스트를 붙여넣습니다.
2. **AI 분석 및 재구성:** `AI 첨삭` 버튼 클릭 시, JD 핵심 키워드가 추출되며 맞춤형 자소서가 생성됩니다.
3. **비교 및 확인:** Before / After 화면을 통해 변환된 문장을 비교하고, After는 직접 다듬을 수 있습니다.

## 🔌 백엔드 API

**`POST /api/rewrite`**

```json
// Request
{ "resume": "자소서 원문", "jd": "채용공고 텍스트", "emphasis": "강조하고 싶은 경험 (선택)" }

// Response
{ "keywords": ["키워드1", "키워드2"], "draft": "재구성된 자소서 전체 텍스트" }
```

---

## 👥 팀원 및 역할 (Team)

| 이름 | 역할 | 담당 업무 |
| :---: | :---: | :--- |
| **팀원 A** | Product & PM | 회의 진행, 기획서 작성, 문제 상황 정의, GITHUB & NOTION 관리 |
| **팀원 B** | Frontend | 메인 UI 개발 및 화면 컴포넌트 구성 |
| **팀원 C** | AI | 프롬프트 엔지니어링 및 기능 개발 |
| **팀원 D** | Backend | Claude/OpenAI API 연동 및 MVP 구축 |

---

## 🏆 행사 안내 (Event Info)

- **행사명:** 멋쟁이사자처럼 AI 바이브톤 (AI Vibe-thon)
- **일시:** 2026년 9월 3일
- **주제:** AI를 활용해 일상 속 문제를 해결하는 디지털 서비스
