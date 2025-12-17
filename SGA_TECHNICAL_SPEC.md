# Especificación Técnica: Integración Backend SGA Data

**Versión:** 1.0
**Fecha:** 17/12/2025
**Proyecto:** SGA Data - Plataforma de Gestión IoT y Eficiencia Energética

---

## 1. Resumen Ejecutivo
El objetivo de este documento es definir la arquitectura técnica y los contratos de API necesarios para conectar el Frontend actual (React 18 + Vite) con una infraestructura de datos real. El Backend debe encargarse de la ingesta de telemetría IoT, almacenamiento de series temporales y exposición de datos securizados vía API REST/Websockets.

---

## 2. Arquitectura Propuesta

```mermaid
graph TD
    Sensor[Sensor IoT / Router 4G] -->|MQTT| Broker[MQTT Broker]
    Broker -->|Ingest Worker| Backend[Backend Core (Node.js/Python/Go)]
    Backend -->|Write| TSDB[(Time-Series DB: Influx/Timescale)]
    Backend -->|Write| RelDB[(Relational DB: PostgreSQL - Users/Meta)]
    
    User[Gestor/Cliente] -->|HTTPS| Frontend[React SPA (SGA Dashboard)]
    Frontend -->|REST API / WSS| Backend
```

### Componentes Clave
1.  **Ingestión**: Broker MQTT (e.g., Mosquitto, HiveMQ) para recibir datos de dispositivos.
2.  **Almacenamiento Caliente**: Base de datos de Series Temporales (InfluxDB o TimescaleDB) para lecturas de energía/sensores.
3.  **Gestión**: PostgreSQL para usuarios, roles, inventario de dispositivos y metadatos.
4.  **API Gateway**: Capa de seguridad y endpoints para el Frontend.

---

## 3. Contrato de API (Frontend Requirements)

El Frontend espera respuestas en formato JSON bajo los siguientes endpoints.

### 3.1. Autenticación

**POST** `/api/auth/login`
- **Request**: `{ "username": "admin", "password": "***" }`
- **Response**:
  ```json
  {
    "token": "eyJhbG...",
    "user": {
      "id": 1,
      "name": "John Smith",
      "role": "client", // o "tech"
      "avatar": "url..."
    }
  }
  ```

### 3.2. Dashboard Cliente (Business)

**GET** `/api/client/kpi-summary`
*Métricas principales para tarjetas superiores.*
- **Response**:
  ```json
  {
    "accumulated_savings": { "value": 14250, "currency": "EUR", "trend_pct": 12.5 },
    "energy_consumption": { "value": 42.8, "unit": "MWh", "trend_pct": -5.2 },
    "carbon_footprint": { "value": 12.4, "unit": "Tons", "target_year": 2028 }
  }
  ```

**GET** `/api/client/energy-chart?range=7d`
*Datos para gráfico de área (Recharts).*
- **Response**:
  ```json
  [
    { "date": "2024-10-20", "consumption_kwh": 4000, "savings_eur": 2400 },
    { "date": "2024-10-21", "consumption_kwh": 3000, "savings_eur": 1398 },
    ...
  ]
  ```

### 3.3. Dashboard Técnico (Operaciones)

**GET** `/api/tech/infrastructure`
*Estado de servicios del sistema.*
- **Response**:
  ```json
  [
    { "service": "Core API", "status": "ONLINE", "latency_ms": 24 },
    { "service": "TimescaleDB", "status": "ONLINE", "latency_ms": 12 },
    { "service": "MQTT Broker", "status": "WARN", "latency_ms": 145 }
  ]
  ```

**GET** `/api/tech/sensors`
*Tabla de telemetría de dispositivos.*
- **Response**:
  ```json
  [
    {
      "id": "MTX-4G-001",
      "zone": "Sector A",
      "rssi": -65,
      "battery_voltage": 3.7,
      "last_seen": "2024-10-21T10:30:00Z",
      "status": "ONLINE"
    },
    ...
  ]
  ```

**WEBSOCKET** `/ws/logs`
*Stream de logs en tiempo real para la consola.*
- **Event**: `new_log`
- **Payload**: `"[INFO] Sensor packet received from node_04. Signal: -45dBm"`

---

## 4. Requisitos de Seguridad

1.  **JWT (JSON Web Tokens)**: Todas las peticiones deben incluir header `Authorization: Bearer <token>`.
2.  **HTTPS**: Obligatorio para tráfico de producción.
3.  **Role-Based Access Control (RBAC)**:
    - Endpoints `/client/*` solo accesibles para role `client`.
    - Endpoints `/tech/*` solo accesibles para role `tech`.

---

## 5. Próximos Pasos para el Equipo Técnico

1.  Levantar servidor (cloud/on-premise).
2.  Configurar Broker MQTT y Base de Datos.
3.  Desarrollar API REST mockeada o real según spec.
4.  Proporcionar URL base (ej: `https://api.sga-data.com`) al equipo Frontend para integración.
