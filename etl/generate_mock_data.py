import pandas as pd
import random
from datetime import datetime, timedelta
import os

# Ensure data directory exists
os.makedirs('data', exist_ok=True)

# Generate Mock Data for Source 1 (Clients)
clients_data = {
    'id_cliente': [f'C{i:03d}' for i in range(1, 11)],
    'nombre_cliente': [f'Cliente {i}' for i in range(1, 11)],
    'email': [f'cliente{i}@example.com' for i in range(1, 11)],
    'region': [random.choice(['Norte', 'Sur', 'Este', 'Oeste']) for _ in range(10)]
}
df_clients = pd.DataFrame(clients_data)
df_clients.to_csv('data/clientes_mock.csv', index=False)
print("Generated data/clientes_mock.csv")

# Generate Mock Data for Source 2 (Readings)
readings_data = {
    'id_dispositivo': [f'DEV-{random.randint(1000, 9999)}' for _ in range(50)],
    'cod_cliente': [random.choice(clients_data['id_cliente']) for _ in range(50)],
    'fecha': [(datetime.now() - timedelta(days=random.randint(0, 30))).strftime('%Y-%m-%d') for _ in range(50)],
    'consumo': [round(random.uniform(10.0, 500.0), 2) for _ in range(50)]
}
df_readings = pd.DataFrame(readings_data)
df_readings.to_excel('data/lecturas_mock.xlsx', index=False)
print("Generated data/lecturas_mock.xlsx")
