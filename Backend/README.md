# 🏥 HealthSync Microservices Backend Architecture

Welcome to the backend orchestrator of **HealthSync**—a state-of-the-art Doctor Appointment & Healthcare Management System built on a modern, distributed microservices architecture. 

This repository leverages **Spring Boot**, **Spring Cloud Gateway**, and a containerized **PostgreSQL** database stack, all fully orchestrated via **Docker** and **Docker Compose**.

---

## 🛠️ System Architecture & Services Map

Traffic enters through a single, secure entry point (the API Gateway) which forwards requests internally within a private Docker network:

```
                            [ User Request ]
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   API Gateway       │  (Port 8080)
                         └──────────┬──────────┘
                                    │ (Internal Docker Network Routing)
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│ User Service │ (Port 8081) │Doctor Service│ (Port 8083) │ Appt Service │ (Port 8084)
└──────┬───────┘             └──────┬───────┘             └──────┬───────┘
       │                            │                            │
       └────────────────────────────┼────────────────────────────┘
                                    ▼
                       ┌─────────────────────────┐
                       │  PostgreSQL Database    │ (Port 5432)
                       │  (user_db, doctor_db,   │
                       │   appointment_db)       │
                       └─────────────────────────┘
```

---

## 🌟 Key Features per Service

### 🚪 [API Gateway](file:///d:/HealthSync/Backend/api-gateway) (Port `8080`)
* **Unified Routing Entry Point:** Automatically maps external paths (`/api/users/**`, `/api/doctors/**`, `/api/appointments/**`) to isolated downstream services.
* **Environment-Driven Configuration:** Easily swap routing endpoints across development, staging, or production via environment variables.

### 👤 [User Service](file:///d:/HealthSync/Backend/user-service) (Port `8081`)
* **Profile Management:** Handles patient/user registrations, security, updates, and profile inquiries.
* **Database Isolation:** Persists records inside a dedicated, isolated database schema (`user_db`).
* **Validation Guards:** Strict DTO checking to ensure full compliance of user profiles.

### 🥼 [Doctor Service](file:///d:/HealthSync/Backend/doctor-service) (Port `8083`)
* **Doctor Profiles:** Register doctors, experience levels, hospital locations, and availability schedules.
* **Specialization Querying:** Allows search filters to find doctors based on specific clinical specializations (e.g. Cardiology, Pediatrics).

### 📅 [Appointment Service](file:///d:/HealthSync/Backend/appointment-service) (Port `8084`)
* **Booking & Scheduling:** Schedule clinical sessions matching patient records with doctor identifiers.
* **State Operations:** Track booking progression lifecycle through defined states (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).

### 🔔 [Notification Service](file:///d:/HealthSync/Backend/notification-service) (Port `8085`)
* **Service Integrations:** Lightweight microservice configured to dispatch real-time events and alerts to patients and healthcare workers.

---

## 🚀 How to Run the System via Docker

Whether you are starting from scratch or updates are made to the codebase, follow these clear instructions.

### 📋 Prerequisites
Ensure you have the following installed:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
* [Maven](https://maven.apache.org/download.cgi) (for compilation)
* [Java 17 SDK](https://adoptium.net/temurin/releases/?version=17)

---

### 🟢 Scenario A: Running for a **New User** (Fresh Setup)

If this is your first time checking out this repository on your computer:

#### 1. Compile and Package the Services
Compile the Spring Boot microservices into lightweight `.jar` execution artifacts:
```powershell
mvn clean package -DskipTests
```

#### 2. Start the Orchestration Stack
Build the lightweight Alpine Docker images and launch the orchestrated containers:
```powershell
docker-compose up --build
```
*Docker will automatically create a private network, spin up the multi-schema PostgreSQL database, initialize schemas via `init-db.sql`, and spin up the microservices.*

---

### 🔵 Scenario B: Running for an **Old User** (Re-running after Code Updates)

If you've pulled updates from git or modified routing configuration, controllers, or service logic:

#### 1. Shut down any running containers
```powershell
docker-compose down
```

#### 2. Clean and Recompile the updated code
```powershell
mvn clean package -DskipTests
```

#### 3. Start up the containers with an forced build trigger
```powershell
docker-compose up --build
```
*This forces Docker to discard cached layers for compiled code, ensuring your fresh updates are instantly deployed.*

---

## 🧪 Testing the Deployments

You can test the running systems directly from your host terminal or by using a client container inside the Docker network.

### 1. Retrieve Registered Users (REST API)
Using Host Terminal:
```powershell
curl http://localhost:8081/api/users
```
Using Client Container:
```powershell
docker run --rm --network backend_default alpine/curl -s http://api-gateway:8080/api/users
```

### 2. Register a New User (POST)
Using Host Terminal:
```powershell
curl -X POST http://localhost:8081/api/users -H "Content-Type: application/json" -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@example.com\",\"password\":\"123456\",\"phone\":\"+1234567890\",\"address\":\"123 Main St\"}"
```
Using Client Container:
```powershell
docker run --rm --network backend_default alpine/curl -s -X POST http://api-gateway:8080/api/users -H "Content-Type: application/json" -d "{\"firstName\":\"Jane\",\"lastName\":\"Doe\",\"email\":\"jane@example.com\",\"password\":\"123456\",\"phone\":\"987654321\",\"address\":\"Home\"}"
```

### 3. Retrieve Registered Doctors
```powershell
docker run --rm --network backend_default alpine/curl -s http://api-gateway:8080/api/doctors
```

---

## 🗄️ Database Management & Operations

Each database-driven microservice (`user-service`, `doctor-service`, `appointment-service`) manages its own isolated PostgreSQL database schema.

### 1. Database Setup & Architecture
* **PostgreSQL Container:** Named `healthsync-postgres`, running on port `5432`.
* **Database Initialization:** On the first run, the container runs [init-db.sql](file:///d:/HealthSync/Backend/init-db.sql) to create the isolated databases:
  * `user_db` (for `user-service`)
  * `doctor_db` (for `doctor-service`)
  * `appointment_db` (for `appointment-service`)
* **Schema Versioning (Flyway):** When a microservice starts up, **Flyway** automatically creates the `flyway_schema_history` table and executes the SQL migration files located under `src/main/resources/db/migration/` of that service.

### 2. How to See All Users' Data (Including Hashed Passwords)
User passwords are encrypted securely using **BCrypt** hashing before storing. You can view all registered users and their password hashes by querying the PostgreSQL container directly:

```powershell
docker exec -t healthsync-postgres psql -U postgres -d user_db -c "SELECT id, first_name, last_name, email, phone, role, password FROM users;"
```

*Example Output:*
```text
 id | first_name | last_name |      email       |    phone    |  role   |                           password                           
----+------------+-----------+------------------+-------------+---------+--------------------------------------------------------------
  1 | John       | Doe       | john@example.com | +1234567890 | PATIENT | $2a$10$eImiTXuWV5j7ae9efMinme8WnJW17W4f4yFk.Gv2VfH2WkKjZ1Y4G
```

### 3. How to Clear All User Data
If you need to wipe out all users and reset the auto-incrementing primary key ID sequence back to `1` (for testing purposes), run the following database command:

```powershell
docker exec -t healthsync-postgres psql -U postgres -d user_db -c "TRUNCATE TABLE users RESTART IDENTITY CASCADE;"
```

*Note: The `RESTART IDENTITY` clause ensures that the next registered user will start with ID `1` again.*
