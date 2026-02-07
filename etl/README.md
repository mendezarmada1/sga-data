# Generic ETL Processor for SGA Data

Este proyecto contiene un proceso ETL (Extract, Transform, Load) genérico construido con Python y Pandas.
Está diseñado para cargar dos fuentes de datos CSV, unificarlas basándose en una clave configurable, guardarlas en una base de datos PostgreSQL y exportar el resultado.

## Estructura

- `main.py`: Script principal.
- `config.py`: Cargador de configuración.
- `mapping.json`: **Archivo Clave**. Define cómo mapear las columnas de los CSV a la Base de Datos.
- `generate_mock_data.py`: Genera datos de prueba.
- `requirements.txt`: Dependencias de Python.

## Configuración

### 1. Variables de Entorno (.env)
Crea un archivo `.env` en este directorio (o configura las variables en tu entorno de despliegue):

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mi_base_de_datos
DB_USER=mi_usuario
DB_PASSWORD=mi_contraseña

INPUT_FILE_1_PATH=ruta/al/archivo1.csv
INPUT_FILE_2_PATH=ruta/al/archivo2.csv
OUTPUT_PATH=ruta/al/resultado.csv
```

### 2. Mapeo (mapping.json)
Edita este archivo para ajustar las columnas cuando recibas los datos reales.

```json
{
  "files": {
    "source_1": {
      "path_env_var": "INPUT_FILE_1_PATH",
      "columns": {
        "NombreColumnaCSV": "nombre_columna_db"
      },
      "key": "nombre_columna_db_clave"
    },
    ...
  }
}
```

## Ejecución Local

1.  Instalar dependencias:
    ```bash
    pip install -r requirements.txt
    ```

2.  Generar datos de prueba (opcional):
    ```bash
    python generate_mock_data.py
    ```

3.  Ejecutar ETL:
    ```bash
    python main.py
    ```

## Integración
Este script puede ser ejecutado por cualquier orquestador (cron, Airflow, Mage) simplemente llamando a `python main.py` con las variables de entorno adecuadas.
