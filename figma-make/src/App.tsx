import { useState } from "react";

type Screen = "list" | "input" | "loading" | "result" | "saved";

interface ResumeData {
  coverLetter: string;
  jobDescription: string;
  experience: string;
}

const MOCK_KEYWORDS = ["프론트엔드", "React", "TypeScript", "UI/UX", "협업", "애자일", "성과 중심", "커뮤니케이션"];
const MOCK_COMPETENCIES = ["기술적 역량: React, TypeScript, Next.js 실무 경험", "협업 역량: 애자일 팀 환경에서의 개발 경험", "문제 해결: 복잡한 UI 문제를 독립적으로 해결한 경험"];
const MOCK_AFTER = `저는 3년간의 프론트엔드 개발 경험을 바탕으로 카카오에서 요구하는 React 및 TypeScript 기반의 고품질 UI를 구현해왔습니다.

특히 대규모 트래픽 환경에서 성능 최적화를 통해 페이지 로딩 속도를 40% 단축한 경험이 있으며, 이는 귀사가 강조하는 '성과 중심' 문화와 부합합니다.

애자일 팀에서 5명 이상의 개발자, 디자이너와 긴밀히 협업하여 3개의 서비스를 성공적으로 런칭했으며, 사용자 리텐션 25% 향상에 기여했습니다.

귀사의 사용자 중심 서비스 철학에 공감하며, 뛰어난 사용자 경험을 만드는 데 기여하고 싶습니다.`;

function Sidebar({ current, onNavigate }: { current: Screen; onNavigate: (s: Screen) => void }) {
  const items = [
    { id: "list" as Screen, label: "이력서 목록", icon: "📄" },
    { id: "input" as Screen, label: "AI 맞춤 첨삭", icon: "✏️" },
    { id: "result" as Screen, label: "AI 분석 결과", icon: "🤖" },
    { id: "saved" as Screen, label: "저장 완료", icon: "✅" },
  ];

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">JF</span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">JobFit</p>
            <p className="text-xs text-gray-400">AI 이력서 맞춤 서비스</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
              current === item.id
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
        <div className="bg-indigo-50 rounded-xl p-3 mb-4">
          <p className="text-xs text-gray-500 mb-0.5">이번 달 분석</p>
          <p className="text-2xl font-bold text-indigo-700">3회</p>
          <p className="text-xs text-gray-400">무료 플랜 기준 5회 제공</p>
          <div className="mt-2 h-1.5 bg-indigo-100 rounded-full">
            <div className="h-1.5 bg-indigo-500 rounded-full w-3/5" />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-sm font-bold text-indigo-700">김</div>
          <div>
            <p className="text-sm font-medium text-gray-800">김지원</p>
            <p className="text-xs text-gray-400">jiwon@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Screen1List({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const resumes = [
    { title: "기본 이력서", date: "2026.08.28", badge: "최신", badgeColor: "bg-indigo-100 text-indigo-600" },
    { title: "카카오페이 맞춤 이력서", date: "2026.08.15", badge: "AI 맞춤", badgeColor: "bg-violet-100 text-violet-600" },
    { title: "네이버 지원용 이력서", date: "2026.07.22", badge: "AI 맞춤", badgeColor: "bg-violet-100 text-violet-600" },
    { title: "스타트업 공동 이력서", date: "2026.06.10", badge: "초안", badgeColor: "bg-gray-100 text-gray-500" },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">안녕하세요, 김지원님 👋</h1>
        <p className="text-gray-500 mt-1">저장된 이력서를 선택하거나 새 이력서를 추가해보세요.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-7">
        {[
          { label: "저장된 이력서", value: "4개" },
          { label: "AI 맞춤 이력서", value: "2개" },
          { label: "지원 완료", value: "7건" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">내 이력서</h2>
        <button
          onClick={() => onNavigate("input")}
          className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
        >
          + 새 이력서 추가
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {resumes.map((r) => (
          <div
            key={r.title}
            onClick={() => onNavigate("input")}
            className="bg-white rounded-2xl border border-gray-100 p-5 cursor-pointer hover:border-indigo-200 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
                <span className="text-indigo-500 text-base">📄</span>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${r.badgeColor}`}>{r.badge}</span>
            </div>
            <p className="font-semibold text-gray-800 mb-1">{r.title}</p>
            <p className="text-xs text-gray-400 mb-4">마지막 수정 {r.date}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-indigo-500 font-medium group-hover:text-indigo-700">클릭하여 열기</span>
              <span className="text-gray-300 group-hover:text-indigo-400 transition-colors">›</span>
            </div>
          </div>
        ))}

        <button
          onClick={() => onNavigate("input")}
          className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center gap-2 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer min-h-36"
        >
          <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl">+</div>
          <p className="text-sm font-medium text-gray-600">새 이력서 추가</p>
          <p className="text-xs text-gray-400">기본 양식으로 시작하기</p>
        </button>
      </div>
    </div>
  );
}

function Screen2Input({ onNavigate, data, setData }: {
  onNavigate: (s: Screen) => void;
  data: ResumeData;
  setData: (d: ResumeData) => void;
}) {
  const canSubmit = data.coverLetter.trim() && data.jobDescription.trim();

  function handleSubmit() {
    if (!canSubmit) return;
    onNavigate("loading");
    setTimeout(() => onNavigate("result"), 3000);
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-3xl mx-auto py-10 px-8">
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2.5 py-0.5 rounded-full">AI 맞춤 첨삭</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">AI 맞춤 첨삭</h1>
          <p className="text-gray-500 mt-1 text-sm">자기소개서와 채용공고를 입력하면 AI가 맞춤 첨삭을 제공합니다.</p>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              자기소개서 <span className="text-red-400">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-3">현재 작성한 자기소개서를 붙여넣어 주세요.</p>
            <textarea
              value={data.coverLetter}
              onChange={(e) => setData({ ...data, coverLetter: e.target.value })}
              placeholder="예) 저는 3년간 프론트엔드 개발자로 근무하며..."
              rows={8}
              className="w-full resize-none text-sm text-gray-800 placeholder-gray-300 outline-none leading-relaxed"
            />
            <div className="mt-2 pt-2 border-t border-gray-50 flex justify-end">
              <span className="text-xs text-gray-300">{data.coverLetter.length}자</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              채용공고 (JD) <span className="text-red-400">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-3">지원하려는 채용공고 내용을 붙여넣어 주세요.</p>
            <textarea
              value={data.jobDescription}
              onChange={(e) => setData({ ...data, jobDescription: e.target.value })}
              placeholder="예) [카카오] 프론트엔드 개발자 채용&#10;- React, TypeScript 3년 이상..."
              rows={8}
              className="w-full resize-none text-sm text-gray-800 placeholder-gray-300 outline-none leading-relaxed"
            />
            <div className="mt-2 pt-2 border-t border-gray-50 flex justify-end">
              <span className="text-xs text-gray-300">{data.jobDescription.length}자</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-semibold text-gray-800 mb-1">강조하고 싶은 경험</label>
            <p className="text-xs text-gray-400 mb-3">특별히 강조하고 싶은 프로젝트나 경험이 있다면 알려주세요. (선택)</p>
            <textarea
              value={data.experience}
              onChange={(e) => setData({ ...data, experience: e.target.value })}
              placeholder="예) 대규모 트래픽 서비스 성능 최적화 경험, 스타트업 0→1 서비스 개발..."
              rows={4}
              className="w-full resize-none text-sm text-gray-800 placeholder-gray-300 outline-none leading-relaxed"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onNavigate("list")}
              className="px-5 py-3 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
                canSubmit
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-100"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              ✨ AI 첨삭하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Screen5Loading({ onNavigate, failed, setFailed }: {
  onNavigate: (s: Screen) => void;
  failed: boolean;
  setFailed: (b: boolean) => void;
}) {
  return (
    <div className="flex-1 bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-8">
        {!failed ? (
          <>
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🤖</div>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">AI가 분석하고 있습니다</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              채용공고와 자기소개서를 분석하고<br />맞춤 첨삭을 생성하고 있습니다...
            </p>
            <div className="mt-6 space-y-2">
              {["채용공고 키워드 추출 중...", "자기소개서 분석 중...", "맞춤 첨삭 생성 중..."].map((step, i) => (
                <div key={step} className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                  {step}
                </div>
              ))}
            </div>
            <button
              onClick={() => setFailed(true)}
              className="mt-8 text-xs text-gray-300 hover:text-gray-400 underline transition-colors"
            >
              실패 상태 미리보기
            </button>
          </>
        ) : (
          <>
            <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center text-3xl">
              ⚠️
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">AI 첨삭에 실패했습니다</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              일시적인 오류가 발생했습니다.<br />잠시 후 다시 시도해주세요.
            </p>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  setFailed(false);
                  setTimeout(() => onNavigate("result"), 3000);
                }}
                className="w-full py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                다시 시도하기
              </button>
              <button
                onClick={() => onNavigate("input")}
                className="w-full py-3 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                입력 화면으로 돌아가기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Screen3Result({ onNavigate, data }: { onNavigate: (s: Screen) => void; data: ResumeData }) {
  const [afterText, setAfterText] = useState(MOCK_AFTER);

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto py-8 px-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-full">AI 분석 완료</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">AI 맞춤 첨삭 결과</h1>
            <p className="text-gray-500 mt-1 text-sm">채용공고 분석 기반으로 자기소개서를 최적화했습니다.</p>
          </div>
          <button
            onClick={() => onNavigate("saved")}
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            저장하기
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">JD 핵심 키워드</p>
            <div className="flex flex-wrap gap-2">
              {MOCK_KEYWORDS.map((kw) => (
                <span key={kw} className="text-xs font-medium px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full">
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">매칭 점수</p>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold text-indigo-600">87</span>
              <span className="text-lg text-gray-400 mb-1">/ 100</span>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full w-[87%]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">요구 역량 분석</p>
          <div className="space-y-2">
            {MOCK_COMPETENCIES.map((c) => (
              <div key={c} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-indigo-400 mt-0.5">✓</span>
                {c}
              </div>
            ))}
          </div>
        </div>

        {data.experience && (
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-6">
            <p className="text-xs font-semibold text-violet-600 mb-1">강조 경험 반영됨</p>
            <p className="text-sm text-violet-800">{data.experience}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-500 rounded-lg">Before</span>
              <span className="text-sm font-semibold text-gray-700">기존 자기소개서</span>
            </div>
            <div className="text-sm text-gray-500 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4 h-80 overflow-y-auto">
              {data.coverLetter || "입력된 자기소개서가 여기에 표시됩니다."}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-indigo-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold px-2.5 py-1 bg-indigo-100 text-indigo-600 rounded-lg">After</span>
              <span className="text-sm font-semibold text-gray-700">AI 맞춤 자기소개서</span>
              <span className="ml-auto text-xs text-gray-400">직접 수정 가능</span>
            </div>
            <textarea
              value={afterText}
              onChange={(e) => setAfterText(e.target.value)}
              className="w-full h-80 text-sm text-gray-800 leading-relaxed outline-none resize-none bg-indigo-50/30 rounded-xl p-4"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => onNavigate("input")}
            className="px-5 py-2.5 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            다시 입력하기
          </button>
          <button
            onClick={() => onNavigate("saved")}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

function Screen4Saved({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex-1 bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-8">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center text-3xl">
          🎉
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">맞춤 이력서가 저장되었습니다.</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          AI 첨삭 결과가 이력서 목록에 추가되었습니다.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-base">📄</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">카카오페이 맞춤 이력서</p>
              <p className="text-xs text-gray-400">AI 맞춤 · 방금 저장됨</p>
            </div>
            <span className="ml-auto text-xs font-medium px-2.5 py-1 bg-violet-100 text-violet-600 rounded-full">AI 맞춤</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">매칭 점수</p>
              <p className="text-sm font-bold text-indigo-600">87점</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">키워드 반영</p>
              <p className="text-sm font-bold text-gray-800">8개</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onNavigate("list")}
            className="w-full py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            이력서 목록으로 돌아가기
          </button>
          <button
            onClick={() => onNavigate("result")}
            className="w-full py-3 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            결과 다시 보기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("list");
  const [failed, setFailed] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    coverLetter: "",
    jobDescription: "",
    experience: "",
  });

  function navigate(s: Screen) {
    if (s !== "loading") setFailed(false);
    setScreen(s);
  }

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
      <Sidebar current={screen === "loading" ? "input" : screen} onNavigate={navigate} />

      {screen === "list" && <Screen1List onNavigate={navigate} />}
      {screen === "input" && (
        <Screen2Input onNavigate={navigate} data={resumeData} setData={setResumeData} />
      )}
      {screen === "loading" && (
        <Screen5Loading onNavigate={navigate} failed={failed} setFailed={setFailed} />
      )}
      {screen === "result" && <Screen3Result onNavigate={navigate} data={resumeData} />}
      {screen === "saved" && <Screen4Saved onNavigate={navigate} />}
    </div>
  );
}
