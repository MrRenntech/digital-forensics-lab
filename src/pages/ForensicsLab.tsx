import React, { useEffect, useState } from "react";
import { uploadEvidence, runTskFls, runVolPslist, JobInfo } from "../utils/forensicsApi";
import ForensicsJobCard from "../components/ForensicsJobCard";

const apiHost = import.meta.env.VITE_FORENSICS_API ?? "http://localhost:5000";
const API_KEY = "changeme";

export default function ForensicsLab() {
  const [file, setFile] = useState<File | null>(null);
  const [jobs, setJobs] = useState<JobInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastOutput, setLastOutput] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("forensic_jobs_v1");
    if (raw) setJobs(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("forensic_jobs_v1", JSON.stringify(jobs));
  }, [jobs]);

  async function onUpload() {
    if (!file) return alert("Choose a file first");
    setLoading(true);
    try {
      const res = await uploadEvidence(apiHost, API_KEY, file);
      const job: JobInfo = { job_id: res.job_id, filename: res.filename, created_at: Date.now() };
      setJobs([job, ...jobs]);
    } catch (err: any) {
      alert("Upload failed: " + (err?.message ?? String(err)));
    } finally {
      setLoading(false);
    }
  }

  async function onRunFls(job: JobInfo) {
    setLoading(true); setLastOutput(null);
    try {
      const out = await runTskFls(apiHost, API_KEY, job.job_id);
      setLastOutput(out.stdout || out.stderr || JSON.stringify(out, null, 2));
    } catch (err: any) {
      setLastOutput("Error: " + (err?.message ?? String(err)));
    } finally {
      setLoading(false);
    }
  }

  async function onRunPslist(job: JobInfo) {
    setLoading(true); setLastOutput(null);
    try {
      const out = await runVolPslist(apiHost, API_KEY, job.job_id);
      setLastOutput(out.stdout || out.stderr || JSON.stringify(out, null, 2));
    } catch (err: any) {
      setLastOutput("Error: " + (err?.message ?? String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Forensics Lab</h1>

      <section className="mb-6">
        <label className="block mb-2">Upload evidence</label>
        <div className="flex gap-2">
          <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="border p-2 rounded" />
          <button onClick={onUpload} disabled={loading} className="btn">
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
        <p className="text-sm text-muted mt-2">Backend: {apiHost}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Jobs</h2>
        <div className="grid gap-3">
          {jobs.length === 0 && <div className="text-sm text-muted">No jobs yet</div>}
          {jobs.map((j) => (
            <ForensicsJobCard key={j.job_id} job={j} onRunFls={() => onRunFls(j)} onRunPslist={() => onRunPslist(j)} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Last Output</h2>
        <pre className="whitespace-pre-wrap bg-gray-900 text-green-200 p-4 rounded h-64 overflow-auto">
          {lastOutput ?? "Run a tool to see output."}
        </pre>
      </section>
    </div>
  );
}
