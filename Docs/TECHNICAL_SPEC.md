# Web Banking Platform - Technical Specification

> Banco Multimoney | Arquitectura y Plan de Implementación
> Versión: 1.0 | Enero 2026 | Clasificación: Confidencial

---

## 📌 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Alcance Funcional](#alcance-funcional)
3. [Arquitectura de Solución](#arquitectura-de-solución)
4. [Stack Tecnológico](#stack-tecnológico)
5. [Integración Core SYSDE](#integración-core-sysde)
6. [Modelo de Datos](#modelo-de-datos)
7. [Seguridad Bancaria](#seguridad-bancaria)
8. [API Endpoints](#api-endpoints)
9. [Configuración de Entorno](#configuración-de-entorno)
10. [Cronograma](#cronograma)

---

## Resumen Ejecutivo

### Objetivo
Desarrollar una plataforma de Web Banking moderna, segura y escalable integrada con el Core Bancario SYSDE Oracle.

### Indicadores Clave

| Métrica | Objetivo |
|---------|----------|
| Usuarios soportados | 15,000 - 100,000 (escalable) |
| Disponibilidad | 99.9% SLA |
| Tiempo de respuesta | < 200ms (p95) |
| Cobertura de tests | ≥ 80% |

### Modelo de Desarrollo
- **Enfoque**: 1 Desarrollador Senior + Herramientas IA
- **Timeline**: 12-16 semanas
- **Inversión**: $7,000 - $8,500 USD

---

## Alcance Funcional

### MVP - Módulos Incluidos

#### 1. Autenticación y Seguridad
- ✅ Login con AWS Cognito
- ✅ MFA obligatorio (TOTP + SMS)
- ✅ Gestión de sesiones (máximo 3 simultáneas)
- ✅ Gestión de dispositivos de confianza
- ✅ Bloqueo automático por intentos fallidos
- ✅ Recuperación de contraseña

#### 2. Gestión de Cuentas
- ✅ Consulta de cuentas de ahorro
- ✅ Consulta de cuentas corrientes
- ✅ Saldos en tiempo real (desde Core SYSDE)
- ✅ Historial de movimientos con filtros
- ✅ Exportación de movimientos

#### 3. Transferencias
- ✅ Transferencias entre cuentas propias
- ✅ Transferencias a terceros (mismo banco)
- ✅ Transferencias ACH (interbancarias)
- ✅ Verificación OTP por transacción
- ✅ Límites diarios/mensuales configurables
- ✅ Gestión de beneficiarios (cooling-off 24h)

#### 4. Certificados de Depósito (CDP)
- ✅ Apertura de nuevos CDP
- ✅ Consulta de CDPs activos
- ✅ Proyección de intereses
- ✅ Configuración de renovación automática
- ✅ Retiro anticipado (con penalización)

#### 5. Estados de Cuenta
- ✅ Visualización digital mensual
- ✅ Descarga en formato PDF
- ✅ Histórico de períodos anteriores
- ✅ Búsqueda de transacciones

#### 6. Notificaciones
- ✅ Alertas por email (SendGrid)
- ✅ Alertas por SMS (Twilio)
- ✅ Confirmación de transacciones
- ✅ Alertas de seguridad (login, cambios)

### Fuera del Alcance (Fase 2)
- ❌ Notificaciones push
- ❌ Portal administrativo avanzado
- ❌ Soft token propietario
- ❌ Chatbot/Asistente virtual

---

## Arquitectura de Solución

### Principios Arquitectónicos

| Principio | Descripción | Beneficio |
|-----------|-------------|-----------|
| **Clean Architecture** | Separación estricta de capas | Mantenibilidad, testing |
| **SOLID** | Principios de diseño OOP | Código extensible |
| **CQRS** | Separación de lectura/escritura | Performance |
| **Event-Driven** | Comunicación asíncrona | Desacoplamiento |
| **Zero Trust** | Validación en cada capa | Seguridad robusta |

### Diagrama de Capas

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                         │
│  ┌─────────────────┐  ┌─────────────────┐                      │
│  │   Web Banking   │  │   Admin Portal  │                      │
│  │   (Next.js)     │  │   (React)       │                      │
│  └─────────────────┘  └─────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                 CAPA DE INFRAESTRUCTURA/GATEWAY                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │CloudFlare│ │   WAF    │ │  Rate    │ │   API Gateway    │   │
│  │CDN+DDoS  │ │ AWS WAF  │ │ Limiter  │ │   (Kong/AWS)     │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                   CAPA DE MICROSERVICIOS                        │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │  Auth  │ │Customer│ │Account │ │Transact│ │  CDP   │       │
│  │Service │ │Service │ │Service │ │Service │ │Service │       │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘       │
│  ┌────────┐ ┌────────┐ ┌─────────────────────────────────┐     │
│  │Statemt │ │ Notif  │ │         Audit Service           │     │
│  │Service │ │Service │ │                                 │     │
│  └────────┘ └────────┘ └─────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE INTEGRACIÓN                          │
│  ┌─────────────────────┐ ┌──────────┐ ┌──────────────────┐     │
│  │ Integration Service │ │  Redis   │ │  Message Queue   │     │
│  │   (API + Queues)    │ │  Cache   │ │                  │     │
│  └─────────────────────┘ └──────────┘ └──────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      CAPA DE DATOS                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │ SQL Server  │ │  MongoDB    │ │   Oracle    │ │   Redis   │ │
│  │  (Config)   │ │  (Logs)     │ │   SYSDE     │ │  (Cache)  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Microservicios

| Servicio | Responsabilidad | Color en Diagrama |
|----------|-----------------|-------------------|
| **Auth** | Login/MFA, JWT Tokens, Sesiones, Dispositivos | Amarillo |
| **Customer** | Perfil, KYC Data, Settings | Verde |
| **Account** | Balances, Movimientos, Savings, Checking | Morado |
| **Transact** | Transferencias, Validación, OTP, Límites | Rojo |
| **CDP** | Opening, Interest, Maturity, Renewal | Naranja |
| **Statement** | Generate, PDF Export, History | Azul |
| **Notif** | Email, SMS, Alerts | Amarillo |
| **Audit** | Logging, Security, Compliance | Gris |

---

## Stack Tecnológico

### Por Capa

| Capa | Tecnología | Versión | Justificación |
|------|------------|---------|---------------|
| **Frontend** | Next.js | 14+ | SSR, rendimiento, SEO |
| **UI Components** | TailwindCSS + Radix | Latest | Accesibilidad, diseño moderno |
| **Backend** | NestJS | 10 | TypeScript nativo, Clean Arch |
| **Runtime** | Node.js | 20 LTS | Estabilidad, soporte largo |
| **Auth** | AWS Cognito | - | MFA empresarial, managed |
| **DB Config** | SQL Server | 2019 | Licenciamiento, integración |
| **DB Logs** | MongoDB Atlas | 7 | Flexibilidad, TTL, escala |
| **DB Core** | Oracle SYSDE | Existente | Fuente de verdad |
| **Cache** | Redis | 7 | Sesiones, rate limiting |
| **Cloud** | AWS | - | Cognito, infraestructura |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| Git + GitHub | Control de versiones, CI/CD |
| Docker | Contenedores |
| Terraform | Infraestructura como código |
| Jest | Testing unitario |
| Playwright | Testing E2E |

### Herramientas IA (Desarrollo)

| Herramienta | Costo/Mes | Uso Principal |
|-------------|-----------|---------------|
| Claude Max | $200 | Arquitectura, código complejo, debugging, SQL |
| Cursor Pro | $20 | IDE con IA, edición multi-archivo |
| GitHub Copilot | $19 | Autocompletado, tests, código repetitivo |
| v0 by Vercel | $20 | Generación de UI/componentes React |
| ChatGPT Plus | $20 | Segunda opinión, casos específicos |

---

## Integración Core SYSDE

### Principio Fundamental
> El Core SYSDE Oracle es la **fuente de verdad**. El Web Banking nunca modifica datos directamente, solo a través de Stored Procedures autorizados.

### Matriz de Operaciones

| Base de Datos | READ | WRITE | Propósito |
|---------------|------|-------|-----------|
| **Oracle SYSDE** | ✅ | Solo SP* | Datos maestros, transacciones |
| **SQL Server** | ✅ | ✅ | Configuraciones web banking |
| **MongoDB** | ✅ | ✅ | Logs, auditoría |
| **Redis** | ✅ | ✅ | Cache, sesiones temporales |

*SP = Stored Procedures existentes

### Tablas Oracle SYSDE (Lectura)

```sql
-- Queries directos permitidos
SYSDE.CLIENTES      → Datos maestros de clientes
SYSDE.CUENTAS       → Saldos y estados
SYSDE.MOVIMIENTOS   → Historial transaccional
SYSDE.CDP           → Certificados de depósito
```

### Stored Procedures Oracle (Escritura)

```sql
-- Llamadas autorizadas para operaciones
SP_EJECUTAR_TRANSFERENCIA(origen, destino, monto)
SP_APERTURA_CDP(cliente, monto, plazo, tasa)
SP_REGISTRAR_ACCESO(cliente, ip, canal)
```

---

## Modelo de Datos

### SQL Server - Configuraciones Web Banking

```sql
-- Tabla: user_security_config
CREATE TABLE user_security_config (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    cognito_user_id NVARCHAR(128) UNIQUE,
    cliente_id_sysde NVARCHAR(50),
    mfa_enabled BIT DEFAULT 1,
    preferred_mfa_type NVARCHAR(10),
    max_sessions INT DEFAULT 3,
    daily_transfer_limit DECIMAL(18,2)
);

-- Tabla: active_sessions
CREATE TABLE active_sessions (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    cognito_user_id NVARCHAR(128),
    session_id NVARCHAR(64) UNIQUE,
    device_fingerprint NVARCHAR(64),
    ip_address NVARCHAR(45),
    expires_at DATETIME2
);

-- Tabla: beneficiaries
CREATE TABLE beneficiaries (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    cognito_user_id NVARCHAR(128),
    alias NVARCHAR(100),
    account_number_encrypted VARBINARY(500),
    bank_code NVARCHAR(20),
    status NVARCHAR(20),
    cooling_off_until DATETIME2
);
```

### MongoDB - Logs y Auditoría

```javascript
// Colección: audit_logs (TTL: 2 años)
{
  _id: ObjectId,
  correlationId: String,
  userId: String,
  action: String,
  resource: String,
  timestamp: ISODate,
  ipAddress: String,
  userAgent: String,
  requestBody: Object,  // Sanitizado
  responseStatus: Number,
  duration: Number
}

// Colección: security_events
{
  _id: ObjectId,
  eventType: String,  // LOGIN_FAILED, MFA_VERIFIED, etc.
  userId: String,
  severity: String,   // INFO, WARNING, CRITICAL
  details: Object,
  timestamp: ISODate
}

// Colección: transaction_logs (TTL: 7 años)
{
  _id: ObjectId,
  transactionId: String,
  type: String,
  amount: Decimal128,
  currency: String,
  status: String,
  createdAt: ISODate,
  completedAt: ISODate
}

// Colección: api_request_logs (TTL: 90 días)
{
  _id: ObjectId,
  endpoint: String,
  method: String,
  statusCode: Number,
  responseTime: Number,
  timestamp: ISODate
}
```

### Redis - Cache y Sesiones

```
# Estructura de claves

session:{userId}        → JWT payload (TTL: 15min)
otp:{identifier}        → Códigos OTP (TTL: 5min)
cache:account:{id}      → Saldos (TTL: 30seg)
ratelimit:{ip}:{endpoint} → Contadores
```

---

## Seguridad Bancaria

### Modelo de 6 Capas

```
┌─────────────────────────────────────────────────────────────┐
│ CAPA 1: PERÍMETRO                                           │
│ • CloudFlare: CDN + Protección DDoS + Bot Detection         │
│ • AWS WAF: Filtrado SQLi, XSS, CSRF                         │
│ • Rate Limiting: Por IP, usuario, endpoint                  │
│ • Geo-blocking: Solo países autorizados                     │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ CAPA 2: AUTENTICACIÓN                                       │
│ • AWS Cognito User Pools                                    │
│ • MFA Obligatorio: TOTP (preferido) + SMS (backup)          │
│ • JWT Tokens: Access (15min) + Refresh (7 días)             │
│ • Device Fingerprinting                                     │
│ • Detección de anomalías (múltiples IPs, horarios)          │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ CAPA 3: AUTORIZACIÓN                                        │
│ • RBAC (Role-Based Access Control)                          │
│ • Límites por tipo de operación y usuario                   │
│ • Cooling-off period: 24h para nuevos beneficiarios         │
│ • Validación de ownership de cuentas                        │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ CAPA 4: TRANSACCIONAL                                       │
│ • OTP por cada transacción sensible                         │
│ • Validación de límites diarios/mensuales                   │
│ • Detección de patrones inusuales                           │
│ • Bloqueo automático por actividad sospechosa               │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ CAPA 5: DATOS                                               │
│ • Encryption at Rest: AES-256                               │
│ • Encryption in Transit: TLS 1.3                            │
│ • Tokenización de datos sensibles                           │
│ • Enmascaramiento de números de cuenta                      │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ CAPA 6: AUDITORÍA                                           │
│ • Logging inmutable con correlationId                       │
│ • Retención: 2 años (logs), 7 años (transacciones)          │
│ • Alertas en tiempo real                                    │
│ • Integración SIEM ready                                    │
└─────────────────────────────────────────────────────────────┘
```

### Cumplimiento Regulatorio

| Estándar | Estado | Implementación |
|----------|--------|----------------|
| **PCI DSS** | ✅ Diseñado | Tokenización, encriptación, acceso controlado |
| **GDPR/Ley Datos** | ✅ Diseñado | Consentimiento, derecho al olvido |
| **AML/KYC** | ✅ Integrado | Validación contra Core SYSDE |
| **ISO 27001** | 🔄 Framework | Gestión de riesgos |

### Flujo de Autenticación MFA

```
Usuario          Web Banking       Auth Service      AWS Cognito      Core SYSDE
   │                  │                 │                 │                │
   │─── Credenciales ─▶│                 │                 │                │
   │                  │─── Validar ────▶│                 │                │
   │                  │                 │── InitiateAuth ─▶│                │
   │                  │                 │◀─ MFA_REQUIRED ──│                │
   │                  │◀─ Requiere MFA ─│                 │                │
   │◀─ Solicitar MFA ─│                 │                 │                │
   │                  │                 │                 │                │
   │─── Código TOTP ──▶│                 │                 │                │
   │                  │─── Verificar ───▶│                 │                │
   │                  │                 │── VerifyMFA ────▶│                │
   │                  │                 │◀─ JWT Tokens ────│                │
   │                  │                 │                 │                │
   │                  │                 │── Validar cliente ────────────────▶│
   │                  │                 │◀─ Cliente activo / KYC OK ────────│
   │                  │                 │                 │                │
   │                  │◀─ Tokens + Info ─│                 │                │
   │◀─── Dashboard ───│                 │                 │                │
```

---

## API Endpoints

### Base URL
```
/api/v1/docs  → Documentación OpenAPI/Swagger
```

### Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/auth/login` | Iniciar sesión |
| `POST` | `/auth/mfa/verify` | Verificar MFA |
| `POST` | `/auth/logout` | Cerrar sesión |
| `POST` | `/auth/refresh` | Renovar token |
| `GET` | `/accounts` | Listar cuentas |
| `GET` | `/accounts/{id}` | Detalle de cuenta |
| `GET` | `/accounts/{id}/movements` | Movimientos |
| `GET` | `/accounts/{id}/movements/export` | Exportar movimientos |
| `POST` | `/transfers` | Nueva transferencia |
| `POST` | `/transfers/validate` | Validar transferencia |
| `GET` | `/transfers/{id}` | Estado de transferencia |
| `GET` | `/beneficiaries` | Listar beneficiarios |
| `POST` | `/beneficiaries` | Crear beneficiario |
| `DELETE` | `/beneficiaries/{id}` | Eliminar beneficiario |
| `GET` | `/cdp` | Listar CDPs |
| `POST` | `/cdp` | Abrir CDP |
| `GET` | `/cdp/{id}` | Detalle CDP |
| `POST` | `/cdp/{id}/renew` | Renovar CDP |
| `GET` | `/statements` | Estados de cuenta |
| `GET` | `/statements/{id}/pdf` | Descargar PDF |
| `GET` | `/profile` | Perfil de usuario |
| `PUT` | `/profile/settings` | Actualizar preferencias |

---

## Configuración de Entorno

### Variables de Entorno

```bash
# AWS Cognito
COGNITO_USER_POOL_ID=us-east-1_XXXXXXX
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxx
COGNITO_CLIENT_SECRET=xxxxxxxxxxxxxxxxx
COGNITO_REGION=us-east-1

# SQL Server
SQLSERVER_HOST=sqlserver.banco.local
SQLSERVER_PORT=1433
SQLSERVER_DATABASE=BancoMultimoney_Config
SQLSERVER_USER=webbanking_user
SQLSERVER_PASSWORD=<secure_password>

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/webbanking
MONGODB_DATABASE=webbanking_logs

# Oracle SYSDE
ORACLE_HOST=oracle-sysde.banco.local
ORACLE_PORT=1521
ORACLE_SID=SYSDE
ORACLE_USER=webbanking_readonly
ORACLE_PASSWORD=<secure_password>

# Redis
REDIS_HOST=redis.banco.local
REDIS_PORT=6379
REDIS_PASSWORD=<secure_password>

# Servicios externos
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890

# Aplicación
NODE_ENV=production
PORT=3000
JWT_SECRET=<secure_secret>
ENCRYPTION_KEY=<32_byte_key>

# Feature Flags
ENABLE_ACH_TRANSFERS=true
ENABLE_CDP_EARLY_WITHDRAWAL=true
MAX_CONCURRENT_SESSIONS=3
```

---

## Cronograma

### Roadmap General (16 Semanas)

```
SEMANA    │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │13 │14 │15 │16 │
──────────┼───┴───┴───┼───┴───┴───┴───┼───┴───┴───┴───┼───┴───┴───┴───┤
FASE 1    │███████████│               │               │               │
Auth      │           │               │               │               │
──────────┼───────────┼───────────────┼───────────────┼───────────────┤
FASE 2    │           │███████████████│               │               │
Core      │           │               │               │               │
──────────┼───────────┼───────────────┼───────────────┼───────────────┤
FASE 3    │           │               │███████████████│               │
Productos │           │               │               │               │
──────────┼───────────┼───────────────┼───────────────┼───────────────┤
FASE 4    │           │               │               │███████████████│
Hardening │           │               │               │               │
```

### Detalle por Fase

#### FASE 1: Fundamentos + Auth (Semanas 1-3)
| Semana | Entregables |
|--------|-------------|
| 1 | Setup proyecto, infraestructura AWS, CI/CD básico |
| 2 | AWS Cognito + MFA, Auth Service backend |
| 3 | Frontend login, integración SYSDE (lectura), tests |

🎯 **Hito**: Login funcional con MFA

#### FASE 2: Core Banking (Semanas 4-7)
| Semana | Entregables |
|--------|-------------|
| 4 | Account Service, queries Oracle optimizados |
| 5 | Dashboard frontend, consulta movimientos |
| 6 | Transaction Service, integración SP_TRANSFERENCIA |
| 7 | Frontend transferencias, validaciones, OTP |

🎯 **Hito**: Consultas + Transferencias operativas

#### FASE 3: Productos Bancarios (Semanas 8-11)
| Semana | Entregables |
|--------|-------------|
| 8 | CDP Service, apertura y consulta |
| 9 | Frontend CDP, proyección de intereses |
| 10 | Statement Service, generación PDF |
| 11 | Notification Service, integración email/SMS |

🎯 **Hito**: Funcionalidad completa

#### FASE 4: Hardening + Go-Live (Semanas 12-16)
| Semana | Entregables |
|--------|-------------|
| 12 | Audit Service, dashboards de logs |
| 13 | Security review, OWASP checklist |
| 14 | Performance testing, optimización |
| 15 | UAT con usuarios piloto |
| 16 | Documentación, deployment producción |

🎯 **Hito**: Plataforma en producción

### Demos Programadas

| Fecha | Demo |
|-------|------|
| Semana 3 | Demo #1: Login + MFA |
| Semana 7 | Demo #2: Cuentas + Transferencias |
| Semana 11 | Demo #3: Funcionalidad completa |
| Semana 14 | Demo #4: Security + Performance |
| Semana 16 | Go-Live |

---

## Métricas de Éxito

### KPIs Técnicos

| Métrica | Target | Herramienta |
|---------|--------|-------------|
| Disponibilidad | ≥ 99.9% | CloudWatch |
| Response time API (p95) | < 200ms | APM |
| Error rate | < 0.1% | Logs/Alertas |
| Test coverage | ≥ 80% | Jest/SonarQube |
| Security score | A | OWASP ZAP |

### Criterios de Aceptación Go-Live

- [ ] Todos los módulos MVP funcionando
- [ ] Pen test aprobado (sin críticos/altos)
- [ ] Performance test aprobado
- [ ] UAT firmado por usuarios piloto
- [ ] Documentación y runbooks completos
- [ ] Rollback plan documentado

---

## Riesgos y Mitigaciones

| # | Riesgo | Prob. | Impacto | Mitigación |
|---|--------|-------|---------|------------|
| 1 | Bloqueo técnico SYSDE | Media | Alto | POC en semana 2, contacto con DBA |
| 2 | Seguridad insuficiente | Media | Crítico | OWASP checklist, pen test externo |
| 3 | Burnout (1 persona) | Media | Alto | Sprints sostenibles, max 50h/sem |
| 4 | Scope creep | Alta | Medio | MVP estricto, backlog para fase 2 |
| 5 | Performance SYSDE | Media | Medio | Cache Redis, queries optimizados |
| 6 | Disponibilidad IA | Baja | Bajo | Múltiples herramientas backup |

### Plan de Contingencia

```
SI hay bloqueo con SYSDE
→ Mockear datos, continuar desarrollo y resolver en paralelo

SI se detecta vulnerabilidad crítica en pen test
→ Agregar buffer de 2 semanas para remediación antes de go-live

SI el performance es insuficiente
→ Escalar infraestructura utilizando presupuesto de contingencia

SI hay retraso significativo (> 3 semanas)
→ Reducir scope del MVP y mover features a Fase 2
```

---

## Requisitos del Banco

| # | Requisito | Responsable | Fecha Límite |
|---|-----------|-------------|--------------|
| 1 | Acceso Oracle SYSDE (dev) | DBA | Semana 1 |
| 2 | Documentación SPs | DBA | Semana 1 |
| 3 | Cuenta AWS | IT | Semana 1 |
| 4 | Dominio web banking | IT | Semana 2 |
| 5 | Usuarios piloto UAT | Negocio | Semana 12 |

---

*Documento técnico para el proyecto Web Banking - Banco Multimoney*
*Última actualización: Enero 2026*