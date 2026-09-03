const API_BASE = import.meta.env.VITE_API_BASE || "";

export interface RewriteMapping {
  keyword: string;
  changed: string;
}

export interface RewriteResult {
  keywords: string[];
  talent_profile: string;
  after: string;
  mapping: RewriteMapping[];
}

export async function rewriteResume(params: {
  resume: string;
  jd: string;
  emphasis?: string;
}): Promise<RewriteResult> {
  const res = await fetch(`${API_BASE}/api/rewrite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `AI 첨삭 요청이 실패했습니다. (HTTP ${res.status})`);
  }

  return res.json();
}
