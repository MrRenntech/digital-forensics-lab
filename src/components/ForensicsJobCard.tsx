import React from "react";
import { JobInfo } from "../utils/forensicsApi";

export default function ForensicsJobCard({
  job,
  onRunFls,
  onRunPslist,
}: {
  job: JobInfo;
  onRunFls: () => void;
  onRunPslist: () => void;
}) {
  return (
    <div className="p-3 border rounded flex items-center justify-between">
      <div>
        <div className="font-medium">{job.filename}</div>
        <div className="text-sm text-gray-400">Job ID: {job.job_id}</div>
      </div>
      <div className="flex gap-2">
        <button onClick={onRunFls} className="btn btn-sm">fls</button>
        <button onClick={onRunPslist} className="btn btn-sm">pslist</button>
      </div>
    </div>
  );
}
