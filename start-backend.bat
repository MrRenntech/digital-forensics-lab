@echo off
REM Start Backend (opens a new cmd window and runs docker-compose up --build)
cd /d "%~dp0"
start "Backend" cmd /k "cd /d \"%~dp0\" && echo Bringing up backend with docker-compose... && docker-compose -f docker-compose.forensics.yml up --build"
