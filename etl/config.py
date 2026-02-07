import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

class Config:
    # DB Config
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = os.getenv('DB_PORT', '5432')
    DB_NAME = os.getenv('DB_NAME', 'postgres')
    DB_USER = os.getenv('DB_USER', 'postgres')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'password')

    # File Paths
    INPUT_FILE_1_PATH = os.getenv('INPUT_FILE_1_PATH', 'data/clientes_mock.csv')
    INPUT_FILE_2_PATH = os.getenv('INPUT_FILE_2_PATH', 'data/lecturas_mock.csv')
    OUTPUT_PATH = os.getenv('OUTPUT_PATH', 'data/unified_output.csv')
    
    # Mapping File
    MAPPING_FILE = os.path.join(os.path.dirname(__file__), 'mapping.json')
