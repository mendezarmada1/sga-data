from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
import pandas as pd
import io
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI(title="SGA ETL Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"]
)

def sanitize_cols(df):
    df.columns = [str(c).strip().replace(' ', '_').replace('.', '_').upper() for c in df.columns]
    return df

@app.post("/unify")
async def unify_files(csv_file: UploadFile = File(...), xlsx_file: UploadFile = File(...)):
    print(f"Received files: {csv_file.filename}, {xlsx_file.filename}")
    
    try:
        # 1. Read CSV
        content_csv = await csv_file.read()
        df_csv = pd.read_csv(io.BytesIO(content_csv), sep=';')
        
        # Rename logic
        if 'Datetime' in df_csv.columns:
            df_csv.rename(columns={'Datetime': 'DATE_KEY'}, inplace=True)
        else:
            df_csv.rename(columns={df_csv.columns[0]: 'DATE_KEY'}, inplace=True)
        
        # Fix: Ensure correct parsing (CSV is YYYY-MM-DD, standard)
        df_csv['DATE_KEY'] = pd.to_datetime(df_csv['DATE_KEY'], dayfirst=False, errors='coerce')
        # Drop rows with invalid date
        df_csv.dropna(subset=['DATE_KEY'], inplace=True)
        
        # Sanitize CSV Columns
        df_csv = sanitize_cols(df_csv)

        # 2. Read Excel
        content_xlsx = await xlsx_file.read()
        # Row 8 header -> index 7
        df_xl = pd.read_excel(io.BytesIO(content_xlsx), header=7)
        
        if 'DATE' in df_xl.columns:
            df_xl.rename(columns={'DATE': 'DATE_KEY'}, inplace=True)
        else:
            df_xl.rename(columns={df_xl.columns[0]: 'DATE_KEY'}, inplace=True)
            
        # Fix: Force dayfirst=True for Excel DD/MM/YYYY
        df_xl['DATE_KEY'] = pd.to_datetime(df_xl['DATE_KEY'], dayfirst=True, errors='coerce')
        # Drop rows with invalid date
        df_xl.dropna(subset=['DATE_KEY'], inplace=True)
        
        # Sanitize Excel Columns
        df_xl = sanitize_cols(df_xl)

        # 3. ADVANCED MERGE
        # We want to merge on DATE_KEY. 
        # If columns overlap (same name), we should coalesce them (prefer non-null).
        
        # Outer Join
        df_merged = pd.merge(df_csv, df_xl, on='DATE_KEY', how='outer', suffixes=('_CSV', '_XLSX'))
        
        # Identify overlapping columns (those with _CSV or _XLSX suffix)
        cols = df_merged.columns
        base_cols = set()
        for c in cols:
            if c.endswith('_CSV'):
                base_cols.add(c[:-4])
            elif c.endswith('_XLSX'):
                base_cols.add(c[:-5])
        
        # Coalesce Logic
        for base in base_cols:
            col_csv = f"{base}_CSV"
            col_xlsx = f"{base}_XLSX"
            
            if col_csv in df_merged.columns and col_xlsx in df_merged.columns:
                # Combine: Use CSV, fill NaN with XLSX (or vice-versa, depending on priority)
                # Let's say CSV is primary for sensor data if exists
                df_merged[base] = df_merged[col_csv].combine_first(df_merged[col_xlsx])
                
                # Drop original suffixed columns
                df_merged.drop(columns=[col_csv, col_xlsx], inplace=True)
            
            # If only one exists (e.g. only _CSV), rename it back to base
            elif col_csv in df_merged.columns:
                df_merged.rename(columns={col_csv: base}, inplace=True)
            elif col_xlsx in df_merged.columns:
                df_merged.rename(columns={col_xlsx: base}, inplace=True)

        # Sort
        df_merged.sort_values(by='DATE_KEY', inplace=True)
        
        # Calculate Filename Suffix (MMYYYY)
        # User says "mes vencido", currently 012026. Data is from 2026-01.
        # So we take the max date in the data.
        if not df_merged.empty:
            max_date = df_merged['DATE_KEY'].max()
            suffix = max_date.strftime('%m%Y')
        else:
            from datetime import datetime
            suffix = datetime.now().strftime('%m%Y')
            
        filename = f"Report__Assets_Cofinimmo_Spain_{suffix}.xlsx"
        print(f"Generated Filename: {filename}")

        # 4. Export to Memory with Formatting
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df_merged.to_excel(writer, index=False, sheet_name='Unified_Data', startrow=4) # Start at row 5 (0-indexed 4)
            
            ws = writer.sheets['Unified_Data']
            from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
            from openpyxl.drawing.image import Image as XLImage
            from datetime import datetime
            import os

            # --- STYLES ---
            # Colors
            header_fill = PatternFill(start_color="E0F7FA", end_color="E0F7FA", fill_type="solid") # Light Cyan
            white_fill = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid") # White
            
            # Disable Gridlines globally (clean look)
            ws.sheet_view.showGridLines = False

            # Borders
            thin_border = Border(left=Side(style='thin'), right=Side(style='thin'), top=Side(style='thin'), bottom=Side(style='thin'))
            # Fonts
            bold_font = Font(bold=True)
            title_font = Font(bold=True, size=14, color="006064") # Dark Cyan

            # --- CUSTOM HEADER (Rows 1-4) ---
            # Set white background for header area
            for r in range(1, 5):
                for c in range(1, ws.max_column + 5):
                    ws.cell(row=r, column=c).fill = white_fill

            # 1. Logo
            # Use absolute path to be safe
            current_dir = os.getcwd()
            # Try JPG first (user requested update), then PNG
            logo_path_jpg = os.path.join(current_dir, "src", "assets", "logo.jpg")
            logo_path_png = os.path.join(current_dir, "src", "assets", "logo.png")
            
            logo_path = None
            if os.path.exists(logo_path_jpg):
                logo_path = logo_path_jpg
            elif os.path.exists(logo_path_png):
                logo_path = logo_path_png
            
            print(f"Looking for logo at: {logo_path}")
            
            if logo_path and os.path.exists(logo_path):
                try:
                    img = XLImage(logo_path)
                    # Resize to fit reasonable header (approx 60-80px)
                    img.height = 60
                    img.width = 60
                    ws.add_image(img, 'A1')
                    print("Logo added successfully.")
                except Exception as ex:
                    print(f"Could not add logo: {ex}")
            else:
                print("Logo file not found!")

            # 2. Company Name
            ws['B2'] = "SGA DATA"
            ws['B2'].font = title_font
            
            # 3. Issue Date
            ws['B3'] = f"Fecha de emisión: {datetime.now().strftime('%d/%m/%Y')}"
            ws['B3'].font = Font(italic=True, size=10)

            # 4. Data Period
            if not df_merged.empty:
                min_p = df_merged['DATE_KEY'].min().strftime('%d/%m/%Y')
                max_p = df_merged['DATE_KEY'].max().strftime('%d/%m/%Y')
                period_str = f"Periodo de Datos: {min_p} - {max_p}"
            else:
                period_str = "Periodo de Datos: N/A"
            
            ws['B4'] = period_str
            ws['B4'].font = Font(bold=True, size=11, color="006064")

            # --- DATA TABLE SERVING (Starts at Row 5 - Headers) ---
            # Headers are at Row 5 (since startrow=4)
            header_row_idx = 5
            
            # Iterate all cells
            max_col = ws.max_column
            max_row = ws.max_row
            
            # Apply Header Style
            for col in range(1, max_col + 1):
                cell = ws.cell(row=header_row_idx, column=col)
                cell.fill = header_fill
                cell.font = bold_font
                cell.alignment = Alignment(horizontal='center', vertical='center')
                cell.border = thin_border

            # Apply Data Borders (All cells)
            for row in range(header_row_idx, max_row + 1):
                for col in range(1, max_col + 1):
                    cell = ws.cell(row=row, column=col)
                    cell.border = thin_border
                    
            # Auto-adjust column widths (simple approximation)
            for col in ws.columns:
                max_length = 0
                column = col[0].column_letter # Get the column name
                for cell in col:
                    try:
                        if len(str(cell.value)) > max_length:
                            max_length = len(str(cell.value))
                    except:
                        pass
                adjusted_width = (max_length + 2)
                ws.column_dimensions[column].width = adjusted_width

        output.seek(0)
        
        headers = {
            'Content-Disposition': f'attachment; filename="{filename}"'
        }
        return StreamingResponse(output, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', headers=headers)

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
