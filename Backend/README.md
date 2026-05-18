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

Test the running systems inside the private Docker network by starting a temporary client container:

### 1. Retrieve Registered Users
```powershell
docker run --rm --network backend_default alpine/curl -s http://api-gateway:8080/api/users
```

### 2. Register a New User (POST)
```powershell
docker run --rm --network backend_default alpine/curl -s -X POST http://api-gateway:8080/api/users -H "Content-Type: application/json" -d '{\"firstName\":\"Jane\",\"lastName\":\"Doe\",\"email\":\"jane@example.com\",\"password\":\"pass\",\"phone\":\"123\",\"address\":\"Home\"}'
```

### 3. Retrieve Registered Doctors
```powershell
docker run --rm --network backend_default alpine/curl -s http://api-gateway:8080/api/doctors
```
