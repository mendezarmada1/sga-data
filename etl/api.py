from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import json
from main import transform_data, load_mapping
from config import Config

app = FastAPI()

# Configurar CORS para permitir peticiones desde el frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:3000", 
        "https://mendezarmada1.github.io",
        "https://mendezarmada1.github.io/sga-data/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "message": "ETL API is running. Use POST /unify to upload files."}

@app.post("/unify")
async def unify_files(csv_file: UploadFile = File(...), xlsx_file: UploadFile = File(...)):
    print(f"Receiving files: CSV={csv_file.filename}, Excel={xlsx_file.filename}")
    
    try:
        # Load Mapping Config
        mapping = load_mapping()
        
        # 1. Read files into memory
        csv_content = await csv_file.read()
        xlsx_content = await xlsx_file.read()
        
        # 2. Convert to DataFrames
        try:
            df_csv = pd.read_csv(io.BytesIO(csv_content))
            df_xlsx = pd.read_excel(io.BytesIO(xlsx_content))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error parsing file: {str(e)}")

        # 3. Identify and Assign Sources
        # We need to map the uploaded CSV and Excel to 'source_1' and 'source_2' defined in mapping.json.
        # Strategy: Inspect columns.
        
        df_dict = {}
        sources = ['source_1', 'source_2']
        
        def match_source(df, source_config):
            # Check if at least one expected column exists in the dataframe
            expected_cols = source_config['columns'].keys()
            current_cols = df.columns
            return any(col in current_cols for col in expected_cols)

        # Let's try to match CSV first
        csv_assigned = None
        for src in sources:
            if match_source(df_csv, mapping['files'][src]):
                csv_assigned = src
                df_dict[src] = df_csv.rename(columns=mapping['files'][src]['columns'])
                break
        
        # Assign Excel to the remaining source
        if csv_assigned:
            other_src = 'source_2' if csv_assigned == 'source_1' else 'source_1'
            df_dict[other_src] = df_xlsx.rename(columns=mapping['files'][other_src]['columns'])
        else:
            # Fallback: Default to CSV=source_1, Excel=source_2
            print("Warning: Could not auto-detect source by columns. Falling back to default order.")
            df_dict['source_1'] = df_csv.rename(columns=mapping['files']['source_1']['columns'])
            df_dict['source_2'] = df_xlsx.rename(columns=mapping['files']['source_2']['columns'])

        # 4. Transform (Merge)
        unified_df = transform_data(df_dict, mapping)
        
        # 5. Export to Excel (in memory)
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            unified_df.to_excel(writer, index=False, sheet_name='UnifiedData')
        output.seek(0)
        
        headers = {
            'Content-Disposition': 'attachment; filename="Unified_Output.xlsx"'
        }
        
        return StreamingResponse(output, headers=headers, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    except Exception as e:
        print(f"Server Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
