# SGA Data ETL Tool

This tool merges CSV and Excel asset reports into a unified Excel file.

## Quick Start (Recommended)

**Do not use the GitHub Pages link directly.** The application requires a local backend server to function.

1.  **Double-click `start.bat`** in this folder.
    *   This will launch the backend API and the frontend interface automatically.
    *   The app will open at `http://localhost:5173`.
2.  Upload your files.
    *   The result will have Excel columns on the left and CSV columns on the right.

## Manual Setup

If you prefer to run commands manually:

1.  **Backend**:
    ```bash
    pip install -r etl/requirements.txt
    python etl/api.py
    ```
2.  **Frontend**:
    ```bash
    npm install
    npm run dev
    ```

## Troubleshooting "Failed to fetch"

If you see "Failed to fetch", it means the frontend cannot reach the backend.
*   Ensure the black window (API server) is running.
*   Ensure you are using `http://localhost:5173`, NOT the GitHub Pages URL.
