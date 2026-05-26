# User Service

## Overview
The **User Service** handles authentication, user registration, password management, and Google OAuth verification. It stores user data in a PostgreSQL database and issues JWT tokens for the frontend to authenticate subsequent requests.

## Key Endpoints
- `POST /api/auth/login` – email/password login, returns JWT.
- `POST /api/auth/register` – creates a new user, sends verification email.
- `POST /api/auth/google` – verifies Google ID token and logs the user in.
- `GET /api/users/me` – returns the authenticated user's profile.

## Tech Stack
- **Spring Boot 3.x**
- **Spring Security** – JWT authentication
- **Spring Data JPA** – PostgreSQL persistence
- **Java JWT** – token generation/validation
- **Lombok** – boilerplate reduction

## Build & Run
```bash
cd user-service
mvn clean install
mvn spring-boot:run   # runs on http://localhost:8081 by default
```

## Environment Variables
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/healthsync
SPRING_DATASOURCE_USERNAME=healthsync_user
SPRING_DATASOURCE_PASSWORD=strongpassword
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

## Testing
```bash
mvn test   # runs unit & integration tests
```

---
> The service adheres to clean‑architecture principles: Controllers → Services → Repositories.
