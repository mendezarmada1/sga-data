@echo off
echo Iniciando Servidor API ETL...
echo La web necesita que esta ventana se mantenga abierta.
echo.
call etl\venv\Scripts\activate
uvicorn etl.api:app --reload --port 8000 --host 0.0.0.0
pause
