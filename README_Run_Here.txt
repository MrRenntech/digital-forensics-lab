README - How to run frontend & backend quickly
-------------------------------------------------
Files created:

1) start-frontend.bat
   - Double-click to open a new Command Prompt window.
   - Runs: npm install (once) and then npm run dev (Vite dev server).
   - Dev server will stay running in that window.

2) start-backend.bat
   - Double-click to open a new Command Prompt window.
   - Runs: docker-compose -f docker-compose.forensics.yml up --build
   - This starts the forge-runner and cyberchef containers (and bulk-extractor if configured).
   - To stop: close the window or press Ctrl+C in that window, then run 'docker-compose -f docker-compose.forensics.yml down' in project root.

PowerShell alternatives:
- start-frontend.ps1
- start-backend.ps1
  - If PowerShell execution is blocked, run (as Admin):
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

Notes:
- Ensure Docker Desktop is running before starting the backend.
- Ensure ports 5000 and 8081 are free (or update docker-compose.forensics.yml).
- The frontend expects .env.local in project root (created automatically).
- If you prefer to use an integrated terminal in VS Code, you can run:
    npm install
    npm run dev
    docker-compose -f docker-compose.forensics.yml up --build

