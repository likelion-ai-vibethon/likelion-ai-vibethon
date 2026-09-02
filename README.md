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

1. 📂 **자소서 저장소 (Resume Repository)**
   - 작성한 자소서 원문을 텍스트 형태로 저장 및 관리
2. 🔍 **JD 키워드 추출 (JD Keyword Extraction)**
   - 지원하려는 기업의 채용공고(JD) 텍스트를 붙여넣으면 AI가 주요 인재상 및 필수 직무 키워드 자동 추출
3. 🤖 **AI 맞춤 첨삭 및 재구성 (AI Tailored Rewriting)**
   - 원문 자소서와 추출된 JD 키워드를 결합하여 해당 기업에 최적화된 자소서 문장 추천
4. 🔄 **Before & After 비교 (Visual Comparison)**
   - 원문과 AI가 재구성한 결과물을 나란히 비교하여 한눈에 수정 내역 확인
5. 💾 **기업별 버전 관리 (Version Control by Company)**
   - 완성된 맞춤 자소서를 "OO기업 지원용"으로 구분하여 저장소에 보관

---

## 🛠 기술 스택 (Tech Stack)

- **Frontend:** HTML5, CSS3, JavaScript (or React)
- **AI Engine:** Claude API / OpenAI API
- **Storage:** LocalStorage (빠르고 효율적인 MVP 시연용 데이터 관리)
- **Deployment:** Vercel
- **AI Assist Tools:** Claude Code, Cursor 등

---

## 🎬 시연 시나리오 (Demo Scenario)

1. **저장소 확인:** 미리 작성해 둔 자소서 원문을 불러옵니다.
2. **JD 입력:** 타겟 기업의 실제 채용공고 텍스트를 붙여넣습니다.
3. **AI 분석 및 재구성:** `AI 첨삭` 버튼 클릭 시, JD 핵심 키워드가 추출되며 맞춤형 자소서가 생성됩니다.
4. **비교 및 확인:** Before / After 화면을 통해 변환된 문장을 비교합니다.
5. **저장:** 재구성된 결과를 'OO기업 지원용' 버전으로 저장합니다.

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
