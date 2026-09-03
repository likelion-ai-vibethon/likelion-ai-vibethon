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
  highlight?: string;
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

export interface CrawlResult {
  jd_text: string;
  success: boolean;
}

export async function crawlJob(url: string): Promise<CrawlResult> {
  const res = await fetch(`${API_BASE}/api/crawl`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `채용공고를 불러오지 못했습니다. (HTTP ${res.status})`);
  }

  return res.json();
}
