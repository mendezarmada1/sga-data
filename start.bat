@echo off
echo ==========================================
echo      SGA DATA - STARTUP SCRIPT
echo ==========================================

echo [1/3] Checking dependencies...
if not exist "node_modules" (
    echo Installing Node dependencies...
    call npm install
)

echo [2/3] Starting Python Backend...
echo The backend api will run in a new window.
start "SGA Data Backend" python etl/api.py

echoWaiting for backend to initialize...
timeout /t 3 /nobreak >nul

echo [3/3] Starting React Frontend...
echo The application will open in your browser at http://localhost:5173
echo DO NOT close this window or the backend window.
call npm run dev

pause
