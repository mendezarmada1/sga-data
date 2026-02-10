@echo off
echo ==========================================
echo      SGA DATA - STARTUP SCRIPT
echo ==========================================

echo [1/3] Checking Frontend dependencies...
if not exist "node_modules" (
    echo Installing Node dependencies...
    call npm install
)

echo [2/3] Checking Backend dependencies...
echo Installing Python requirements...
pip install -r etl/requirements.txt

echo [3/3] Starting Python Backend...
echo The backend api will run in a new window.
start "SGA Data Backend" cmd /k "python etl/api.py"

echo Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo [4/4] Starting React Frontend...
echo The application will open in your browser at http://localhost:5173
echo DO NOT close this window or the backend window.
call npm run dev

pause
