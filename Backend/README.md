# 🏥 HealthSync Microservices Backend Architecture

Welcome to the **HealthSync** backend – a modern, container‑orchestrated micro‑service ecosystem built with **Spring Boot**, **Spring Cloud Gateway**, and **PostgreSQL**. This repository powers the frontend React application (see the `Frontend/` folder) and provides a robust, scalable API for doctor‑patient appointment management.

---

## 📦 System Overview

The backend consists of five independent services, each running in its own Docker container and exposing a dedicated port. All services communicate via a private Docker network and share a common **Maven** parent POM for dependency management.

```
Backend/
├─ pom.xml                 # Maven parent for all services
├─ docker-compose.yml      # Orchestrates all services + PostgreSQL
├─ api-gateway/            # API Gateway (Spring Cloud Gateway) – port 8080
├─ user-service/           # Authentication & user management – port 8081
├─ doctor-service/         # Doctor profiles & schedules – port 8083
├─ appointment-service/    # Appointment booking & lifecycle – port 8084
└─ notification-service/   # Email/SMS notification (stub) – port 8085
```

### Traffic Flow Diagram

```
[User Request] → API Gateway (8080) →
   ├─ User Service (8081) – auth, JWT, profile
   ├─ Doctor Service (8083) – doctor CRUD, schedule
   ├─ Appointment Service (8084) – book / cancel
   └─ Notification Service (8085) – send alerts
```

All services use **PostgreSQL** (container `healthsync-postgres`) with separate schemas/databases (`user_db`, `doctor_db`, `appointment_db`).

---

## 🛠️ Tech Stack

- **Java 21** (or 17) – language runtime
- **Spring Boot 3.x** – REST API framework
- **Spring Cloud Gateway** – API gateway & routing
- **Spring Security** – JWT authentication
- **Maven** – multi‑module build system
- **Docker & Docker Compose** – containerisation & orchestration
- **PostgreSQL** – relational database
- **Redis** (optional) – caching layer
- **JUnit 5 + Mockito** – unit & integration testing

---

## 🐳 Docker & Docker‑Compose

### Prerequisites
- Docker Desktop (includes Docker Compose)
- Maven (`mvn` command available)
- Java 17 SDK (for building the JARs)

### Quick Start (First‑time setup)
```powershell
# 1️⃣ Build all service JARs (skip tests for speed)
mvn clean package -DskipTests

# 2️⃣ Spin up the entire stack (will build Docker images)
docker-compose up --build
```
The `docker-compose.yml` creates:
- `healthsync-postgres` (PostgreSQL 15) – exposes port `5432` internally.
- One container per service, each mounting its compiled JAR.
- A dedicated Docker network `backend_default` so services resolve each other by container name.

### Re‑running after code changes
```powershell
# Stop the stack
docker-compose down

# Re‑build the JARs (required after source changes)
mvn clean package -DskipTests

# Restart with forced image rebuild
docker-compose up --build
```

### Stopping & Cleaning
```powershell
docker-compose down -v   # also removes named volumes (including the DB data)
```

---

## 📄 Service Summaries

### 1️⃣ API Gateway (`api-gateway/`)
- **Port:** `8080`
- **Responsibilities:**
  - Central routing to downstream services.
  - CORS handling, JWT validation, request logging, rate‑limiting.
- **Key Routes:**
  - `/api/auth/**` → User Service
  - `/api/doctors/**` → Doctor Service
  - `/api/appointments/**` → Appointment Service
  - `/api/notifications/**` → Notification Service
- **Configuration:** See `api-gateway/src/main/resources/application.yml`.

### 2️⃣ User Service (`user-service/`)
- **Port:** `8081`
- **Core Features:**
  - Email/password login, registration, password reset.
  - Google OAuth (ID token verification).
  - JWT issuance (`/api/auth/login`, `/api/auth/google`).
  - `/api/users/me` – fetch authenticated profile.
- **Database:** `user_db`
- **Tech:** Spring Security, Spring Data JPA, BCrypt for password hashing.

### 3️⃣ Doctor Service (`doctor-service/`)
- **Port:** `8083`
- **Core Features:**
  - CRUD for doctor entities (name, specialty, location, schedule).
  - Search & filter doctors (`?specialty=&city=`).
  - `/api/doctors/{id}/schedule` – expose available slots.
- **Database:** `doctor_db`
- **Tech:** Spring Data JPA, Lombok, validation annotations.

### 4️⃣ Appointment Service (`appointment-service/`)
- **Port:** `8084`
- **Core Features:**
  - Create, cancel, and query appointments.
  - State machine (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
  - Conflict detection to avoid double‑booking.
- **Database:** `appointment_db`
- **Tech:** Spring Data JPA, transaction management.

### 5️⃣ Notification Service (`notification-service/`)
- **Port:** `8085`
- **Core Features:**
  - Placeholder for email/SMS dispatch (e.g., via SendGrid, Twilio).
  - Exposes `/api/notifications/send` for internal use.
- **Tech:** Simple Spring Boot controller; can be swapped for a message‑queue consumer later.

---

## ⚙️ Environment Variables
Create a `.env` file at the repository root (automatically loaded by Docker Compose). Example:
```dotenv
# PostgreSQL credentials
POSTGRES_DB=healthsync
POSTGRES_USER=healthsync_user
POSTGRES_PASSWORD=strongpassword

# JWT secret (shared across services)
JWT_SECRET=super_secret_key_change_me

# Google OAuth client ID (used by user‑service)
GOOGLE_CLIENT_ID=your_google_client_id
```
These variables are injected into each service via Spring's `@Value` annotation.

---

## 🧪 Testing

### Unit / Integration Tests (Maven)
```bash
# Run tests for every module
mvn test
```
### API Documentation
Each service ships Swagger UI at `http://localhost:<service‑port>/swagger-ui.html`. When the stack is running, you can also access the gateway‑level docs at `http://localhost:8080/swagger-ui.html`.

---

## 📊 Database Management

### Initialisation
On first container start, Docker runs `init-db.sql` (mounted at `Backend/init-db.sql`) which creates three databases (`user_db`, `doctor_db`, `appointment_db`).

### Flyway Migrations
Each service contains `src/main/resources/db/migration/` with versioned `V1__init.sql`, `V2__add_columns.sql`, etc. Flyway runs automatically at startup.

### Direct Access
```powershell
# Open a psql shell inside the PostgreSQL container
docker exec -it healthsync-postgres psql -U postgres -d user_db
```

### Example Queries
- **List all users (including hashed passwords):**
  ```sql
  SELECT id, first_name, last_name, email, phone, role, password FROM users;
  ```
- **Wipe user data (reset for testing):**
  ```sql
  TRUNCATE TABLE users RESTART IDENTITY CASCADE;
  ```

---

## 📦 Build & Deploy

### Build all services (produces JARs in `target/`)
```bash
mvn clean install
```
### Run a single service locally (without Docker)
```bash
cd user-service
mvn spring-boot:run   # defaults to port 8081
```
### Deploy to Kubernetes (future work)
*The repo is ready for a Helm chart – each service can be containerised and scaled independently.*

---

## 📚 Additional Resources
- **Spring Boot Documentation:** https://spring.io/projects/spring-boot
- **Spring Cloud Gateway Guide:** https://spring.io/projects/spring-cloud-gateway
- **Docker Compose Reference:** https://docs.docker.com/compose/
- **PostgreSQL Official Image:** https://hub.docker.com/_/postgres

---

> **Note** – The backend follows clean‑architecture principles (Controller → Service → Repository) and is fully unit‑tested. Feel free to extend any service with new business logic, add more micro‑services, or plug in a message broker for asynchronous processing.
