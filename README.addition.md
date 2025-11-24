# Forensic Toolbox (added)

This project supports a minimal forensic-toolbox for lab demos:
- CyberChef (client-side embed) for quick decoding/transformations.
- Server-side tools: SleuthKit (TSK), Volatility3, Plaso (log2timeline), bulk_extractor, YARA.
- Run jobs via the `/api/tools/*` endpoints (see API spec).

Quick local dev (experimental)
1. Copy `.env.example` -> `.env` and set values.
2. Start the toolbox services:
   ```bash
   docker-compose -f docker-compose.forensics.yml up --build
   ```
3. Start frontend (from repo root):
   ```bash
   npm ci
   npm run dev
   ```
Notes:
- This is intended for development/demo only; production requires hardened containers, network rules, and role-based auth.
