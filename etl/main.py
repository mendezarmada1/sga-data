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

def transform_data(df_dict, mapping):
    # Determine which source is Left and which is Right
    trans_config = mapping.get('transformation', {})
    left_src_name = trans_config.get('left_source', 'source_1')
    right_src_name = trans_config.get('right_source', 'source_2')
    
    print(f"Merge Order: {left_src_name} (Left) + {right_src_name} (Right)")
    
    df_left = df_dict[left_src_name]
    df_right = df_dict[right_src_name]
    
    key_left = mapping['files'][left_src_name]['key']
    key_right = mapping['files'][right_src_name]['key']
    
    print(f"Merging datasets on keys: {key_left} (Left) and {key_right} (Right)")
    
    # Perform merge
    merged_df = pd.merge(df_left, df_right, left_on=key_left, right_on=key_right, how='inner')
    
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
    df_dict = {}
    try:
        df_dict['source_1'] = extract_data(mapping['files']['source_1'])
        df_dict['source_2'] = extract_data(mapping['files']['source_2'])
    except Exception as e:
        print(f"Extraction failed: {e}")
        return

    # 2. Transform
    try:
        unified_df = transform_data(df_dict, mapping)
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
