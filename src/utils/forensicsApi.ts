export type JobInfo = { job_id: string; filename: string; created_at?: number };

async function apiFetch(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.json();
}

export async function uploadEvidence(apiHost: string, apiKey: string, file: File) {
  const form = new FormData();
  form.append("file", file);
  const url = `${apiHost}/tools/upload?api_key=${encodeURIComponent(apiKey)}`;
  return apiFetch(url, { method: "POST", body: form });
}

export async function runTskFls(apiHost: string, apiKey: string, jobId: string) {
  const url = `${apiHost}/tools/tsk/${encodeURIComponent(jobId)}/fls?api_key=${encodeURIComponent(apiKey)}`;
  return apiFetch(url, { method: "POST" });
}

export async function runVolPslist(apiHost: string, apiKey: string, jobId: string) {
  const url = `${apiHost}/tools/volatility/${encodeURIComponent(jobId)}/pslist?api_key=${encodeURIComponent(apiKey)}`;
  return apiFetch(url, { method: "POST" });
}
