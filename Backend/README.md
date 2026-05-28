# 🏥 HealthSync Microservices Backend Architecture

Welcome to the **HealthSync** backend – a modern, container-orchestrated microservices ecosystem built with **Spring Boot 3.x**, **Spring Cloud Gateway**, and **PostgreSQL**.

This repository powers the frontend React application and provides a robust, scalable set of APIs for doctor-patient appointment management.

---

## 📦 System Overview

The backend consists of five independent microservices. Each service runs in its own container and exposes a dedicated port. All services share a common **Maven** parent POM for simplified dependency management.

```
Backend/
├─ pom.xml                 # Maven parent POM
├─ docker-compose.yml      # Orchestrates all services + PostgreSQL
├─ init-db.sql             # SQL script to initialize DB schemas in Docker
├─ api-gateway/            # Routing Gateway (Spring Cloud Gateway) – Port 8080
├─ user-service/           # Authentication & User Profiles – Port 8081
├─ doctor-service/         # Doctor Profiles & Schedules – Port 8083
├─ appointment-service/    # Appointment Bookings & State – Port 8084
└─ notification-service/   # Email Alerts Dispatcher – Port 8085
```

### Traffic Flow Diagram

```
[User Request] → API Gateway (Port 8080)
                     │
                     ├── /api/users/**        → User Service (Port 8081)
                     ├── /api/doctors/**      → Doctor Service (Port 8083)
                     ├── /api/appointments/** → Appointment Service (Port 8084)
                     └── /api/notifications/**→ Notification Service (Port 8085)
```

All data-retaining services connect to **PostgreSQL** using separate databases (`user_db`, `doctor_db`, `appointment_db`).

---

## 🛠️ Tech Stack

*   **Java 17 / 21** – Language Runtime
*   **Spring Boot 3.x** – REST Application Framework
*   **Spring Cloud Gateway** – API Gateway & Request Routing
*   **Spring Security & JWT** – Stateless token auth and Google OAuth
*   **Maven** – Multi-module Build Automation
*   **Flyway** – Automated Database Schema Migrations
*   **Docker & Docker Compose** – Infrastructure Containerization
*   **PostgreSQL 15** – Enterprise Relational Database

---

## 💻 Running Locally (Without Docker)

Follow these steps to run the microservices directly on your development machine.

### 1. Local Database Setup
The backend requires a local PostgreSQL instance running.

1.  Make sure PostgreSQL is installed and listening on port `5432`.
2.  Login to PostgreSQL (`psql -U postgres`) and create the three required databases:
    ```sql
    CREATE DATABASE user_db;
    CREATE DATABASE doctor_db;
    CREATE DATABASE appointment_db;
    ```
3.  The services are pre-configured to authenticate using the username `postgres` and password `1234`. If your local setup is different, modify the database configurations in:
    *   `user-service/src/main/resources/application.properties`
    *   `doctor-service/src/main/resources/application.yml`
    *   `appointment-service/src/main/resources/application.yml`

### 2. Compile and Package the Services
Build the executable JAR files for all modules from the `Backend` directory:
```bash
mvn clean install -DskipTests
```

### 3. Launch the Microservices
Start each service in a separate terminal window from the `Backend` directory:

1.  **User Service:**
    ```bash
    cd user-service && mvn spring-boot:run
    ```
2.  **Doctor Service:**
    ```bash
    cd doctor-service && mvn spring-boot:run
    ```
3.  **Appointment Service:**
    ```bash
    cd appointment-service && mvn spring-boot:run
    ```
4.  **Notification Service:**
    ```bash
    cd notification-service && mvn spring-boot:run
    ```
5.  **API Gateway:** (Start this last)
    ```bash
    cd api-gateway && mvn spring-boot:run
    ```

*Note: Database tables and schemas will be created automatically on startup by Flyway.*

---

## 🐳 Running with Docker & Docker-Compose

Docker Compose containerizes and links all microservices and the database together.

### Quick Start
1.  **Compile the JARs:**
    ```bash
    mvn clean package -DskipTests
    ```
2.  **Launch Docker Compose (from project root):**
    ```bash
    docker-compose up --build
    ```
    Docker Compose will mount `init-db.sql` automatically, creating the schemas `user_db`, `doctor_db`, and `appointment_db` inside the postgres container on initialization.

### Rebuilding After Code Changes
When code modifications are made, you must recompile the JAR file and rebuild the container image:
```bash
# Compile changes
mvn clean package -DskipTests

# Restart the compose stack with rebuilt images
docker-compose up -d --build <service-name>
```

---

## 📄 Microservice Summaries

### 1. API Gateway (`api-gateway/`)
*   **Port:** `8080`
*   **Role:** Exposes a unified API surface. Receives HTTP calls from the React frontend, processes CORS, validates JWT tokens (for secure endpoints), and routes requests downstream.

### 2. User Service (`user-service/`)
*   **Port:** `8081` | **Database:** `user_db`
*   **Role:** User registration, password encryption (BCrypt), JWT token issue, and user profile management. Integrates Google OAuth ID token verification.

### 3. Doctor Service (`doctor-service/`)
*   **Port:** `8083` | **Database:** `doctor_db`
*   **Role:** Handles doctor profiles (experience, specialties, hospital) and slot booking schedules. Seeds initial doctor entries on container startup.

### 4. Appointment Service (`appointment-service/`)
*   **Port:** `8084` | **Database:** `appointment_db`
*   **Role:** Manages the appointment lifecycle (booking slots, cancellations, status transitions). Detects schedule conflicts.

### 5. Notification Service (`notification-service/`)
*   **Port:** `8085` | **Database:** None
*   **Role:** Sends transactional emails (like appointment booking confirmations) using SMTP (`smtp.gmail.com`).

---

## 📊 Database Migrations & Administration

### Flyway Migrations
Each data-retaining service utilizes Flyway under `src/main/resources/db/migration/`. 
Migrations run automatically on service startup and ensure database tables, keys, and base seed records remain in sync.

### Accessing Database Terminals inside Docker
To connect directly to the database inside the running container:
```bash
docker exec -it healthsync-postgres psql -U postgres -d doctor_db
```

### 🔄 Migrating Local Data into Docker
If you have local records (e.g. doctor lists or user accounts) that need to be copied into the Docker volume, follow this procedure:

1.  **Dump Local Schemas and Data:**
    Using the local PostgreSQL binaries, dump the schemas with clean flags:
    ```powershell
    $env:PGPASSWORD="1234"
    & "C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" -h 127.0.0.1 -U postgres -d user_db --clean --if-exists -f "user_db_dump.sql"
    & "C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" -h 127.0.0.1 -U postgres -d doctor_db --clean --if-exists -f "doctor_db_dump.sql"
    & "C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" -h 127.0.0.1 -U postgres -d appointment_db --clean --if-exists -f "appointment_db_dump.sql"
    ```

2.  **Stop Backend Services:**
    Stop writing components so tables are not locked during restore:
    ```bash
    docker-compose stop user-service doctor-service appointment-service api-gateway frontend notification-service
    ```

3.  **Restore Into Docker:**
    Pipe the SQL scripts into the database container:
    ```powershell
    cmd /c "docker exec -i healthsync-postgres psql -U postgres -d user_db < user_db_dump.sql"
    cmd /c "docker exec -i healthsync-postgres psql -U postgres -d doctor_db < doctor_db_dump.sql"
    cmd /c "docker exec -i healthsync-postgres psql -U postgres -d appointment_db < appointment_db_dump.sql"
    ```

4.  **Restart Services:**
    Restart the containers:
    ```bash
    docker-compose start
    ```
