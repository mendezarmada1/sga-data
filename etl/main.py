import pandas as pd
import json
import os
from sqlalchemy import create_engine
from config import Config

def load_mapping():
    with open(Config.MAPPING_FILE, 'r') as f:
        return json.load(f)

def extract_data(file_config):
    # Use Config to get the path (handling defaults)
    path = getattr(Config, file_config['path_env_var'], os.getenv(file_config['path_env_var']))
    
    print(f"Loading data from: {path}")
    if not path or not os.path.exists(path):
        raise FileNotFoundError(f"File not found at path: {path}")
    
    df = pd.read_csv(path)
    
    # Rename columns based on mapping
    df = df.rename(columns=file_config['columns'])
    
    # Keep only mapped columns + key
    mapped_columns = list(file_config['columns'].values())
    
    # Ensure key is in the list if not already
    if file_config['key'] not in mapped_columns:
        print(f"Warning: Key column '{file_config['key']}' not explicitly mapped in columns list. detailed mapping needed if names differ.")
    
    return df

def transform_data(df1, df2, mapping):
    key1 = mapping['files']['source_1']['key']
    key2 = mapping['files']['source_2']['key']
    
    print(f"Merging datasets on keys: {key1} (Source 1) and {key2} (Source 2)")
    
    # Perform merge (defaulting to inner join, but could be configurable)
    merged_df = pd.merge(df1, df2, left_on=key1, right_on=key2, how='inner')
    
    return merged_df

def load_to_db(df, table_name):
    print(f"Connecting to database: {Config.DB_NAME} at {Config.DB_HOST}")
    db_url = f"postgresql+psycopg2://{Config.DB_USER}:{Config.DB_PASSWORD}@{Config.DB_HOST}:{Config.DB_PORT}/{Config.DB_NAME}"
    engine = create_engine(db_url)
    
    print(f"Writing {len(df)} rows to table '{table_name}'...")
    try:
        df.to_sql(table_name, engine, if_exists='replace', index=False)
        print("Successfully wrote to database.")
    except Exception as e:
        print(f"Database error (skipped for testing if defaults are used): {e}")

def export_data(df, export_config):
    output_path = getattr(Config, export_config['path_env_var'], 'unified_output.csv')
    if not output_path:
        output_path = 'unified_output.csv'
        
    print(f"Exporting data to: {output_path}")
    df.to_csv(output_path, index=False)
    print("Export complete.")

def main():
    print("Starting ETL Process...")
    mapping = load_mapping()
    
    # 1. Extract
    try:
        df1 = extract_data(mapping['files']['source_1'])
        df2 = extract_data(mapping['files']['source_2'])
    except Exception as e:
        print(f"Extraction failed: {e}")
        return

    # 2. Transform
    try:
        unified_df = transform_data(df1, df2, mapping)
        print(f"Transformation complete. unified shape: {unified_df.shape}")
    except Exception as e:
        print(f"Transformation failed: {e}")
        return

    # 3. Load (DB)
    # Note: This might fail in a local environment without a running DB, so we catch it.
    load_to_db(unified_df, mapping['destination']['table_name'])

    # 4. Export (File)
    export_data(unified_df, mapping['export'])
    
    print("ETL Process Finished.")

if __name__ == "__main__":
    main()
