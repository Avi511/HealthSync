# Doctor Service

## Overview
The **Doctor Service** manages doctor profiles, schedules, and availability. It provides CRUD operations for doctor entities and allows querying doctors by specialty, location, or rating.

## Key Endpoints
- `GET /api/doctors` – list all doctors with optional filters (`?specialty=...&city=...`).
- `GET /api/doctors/{id}` – get detailed doctor profile.
- `POST /api/doctors` – create a new doctor (admin only).
- `PUT /api/doctors/{id}` – update doctor information.
- `DELETE /api/doctors/{id}` – delete a doctor (admin only).
- `GET /api/doctors/{id}/schedule` – retrieve available time slots for a doctor.

## Tech Stack
- **Spring Boot 3.x**
- **Spring Data JPA** – PostgreSQL persistence
- **Lombok** – reduce boilerplate
- **Spring Security** – JWT verification (shared secret with other services)

## Build & Run
```bash
cd doctor-service
mvn clean install
mvn spring-boot:run   # runs on http://localhost:8082
```

## Environment Variables
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/healthsync
SPRING_DATASOURCE_USERNAME=healthsync_user
SPRING_DATASOURCE_PASSWORD=strongpassword
JWT_SECRET=your_jwt_secret
```

## Testing
```bash
mvn test   # unit & integration tests
```

---
> The service follows a clean layered architecture (controllers → services → repositories) for easy maintenance and future extensions (e.g., adding rating system, reviews, etc.).
