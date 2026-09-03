const STORAGE_KEY = 'jobfit_resumes'

const DEMO_RESUME = {
  id: 'demo-1',
  title: '데모용 자소서',
  company: null,
  content:
    '저는 대학 시절 3년간 학생 IT 동아리에서 활동하며 팀 프로젝트를 다수 기획하고 완성한 경험이 있습니다. ' +
    '특히 3명의 팀원과 함께 지역 소상공인을 위한 예약 관리 웹 서비스를 처음부터 끝까지 개발하며, ' +
    '기획부터 개발, 배포까지 전 과정을 경험했습니다. 이 과정에서 사용자 피드백을 반영해 여러 차례 기능을 개선했고, ' +
    '문제 해결 능력과 협업 능력을 키울 수 있었습니다. 앞으로도 사용자의 문제를 깊이 이해하고 이를 기술로 해결하는 개발자로 성장하고 싶습니다.',
}

export function getResumes() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    const seed = [DEMO_RESUME]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    return seed
  }
  return JSON.parse(raw)
}

export function saveResume(resume) {
  const resumes = getResumes()
  const updated = [...resumes, resume]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}
