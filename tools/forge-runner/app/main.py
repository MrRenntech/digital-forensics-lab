from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from pydantic import BaseModel
import shutil, os, uuid, subprocess, pathlib, time

app = FastAPI(title="Forensics Forge Runner")

JOB_DIR = os.environ.get("JOB_STORAGE", "/jobs")
API_KEY = os.environ.get("FORGE_API_KEY", "changeme")

def check_api_key(key: str):
    if key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")

@app.post("/tools/upload")
async def upload_evidence(api_key: str = Query(...), file: UploadFile = File(...)):
    check_api_key(api_key)
    job_id = str(uuid.uuid4())
    job_path = os.path.join(JOB_DIR, job_id)
    os.makedirs(job_path, exist_ok=True)
    fp = os.path.join(job_path, file.filename)
    with open(fp, "wb") as out:
        shutil.copyfileobj(file.file, out)
    return {"job_id": job_id, "filename": file.filename}

@app.post("/tools/tsk/{job_id}/fls")
def run_tsk_fls(job_id: str, api_key: str = Query(...)):
    check_api_key(api_key)
    job_path = os.path.join(JOB_DIR, job_id)
    if not os.path.isdir(job_path):
        raise HTTPException(status_code=404, detail="job not found")
    # pick first file in job folder
    candidates = list(pathlib.Path(job_path).iterdir())
    if not candidates:
        raise HTTPException(status_code=400, detail="no evidence uploaded")
    image = str(candidates[0])
    try:
        out = subprocess.run(["fls", "-r", image], capture_output=True, text=True, timeout=120)
        return {"stdout": out.stdout, "stderr": out.stderr, "rc": out.returncode}
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail="tool timeout")
    except FileNotFoundError:
        raise HTTPException(status_code=501, detail="fls (sleuthkit) not installed in container image")

@app.post("/tools/volatility/{job_id}/pslist")
def run_vol_pslist(job_id: str, api_key: str = Query(...)):
    check_api_key(api_key)
    job_path = os.path.join(JOB_DIR, job_id)
    candidates = list(pathlib.Path(job_path).iterdir())
    if not candidates:
        raise HTTPException(status_code=400, detail="no evidence uploaded")
    mem = str(candidates[0])
    # This is a simplified example. Real Volatility usage requires profile/format handling.
    try:
        out = subprocess.run(["vol.py", "pslist", "-f", mem], capture_output=True, text=True, timeout=180)
        return {"stdout": out.stdout, "stderr": out.stderr, "rc": out.returncode}
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail="tool timeout")
    except FileNotFoundError:
        raise HTTPException(status_code=501, detail="volatility not installed in container image")

@app.get("/health")
def health():
    return {"status":"ok", "time": time.time()}
