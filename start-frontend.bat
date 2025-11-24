@echo off
REM Start Frontend (opens a new cmd window and runs npm dev)
cd /d "%~dp0"
start "Frontend" cmd /k "cd /d \"%~dp0\" && echo Running: npm install && npm install && echo Starting dev server... && npm run dev"
