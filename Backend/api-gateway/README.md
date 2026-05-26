# API Gateway

## Overview
The **API Gateway** is the unified entry point for all client requests. It routes incoming HTTP calls to the appropriate micro‑service, handling cross‑cutting concerns such as:
- CORS configuration
- Centralized authentication (JWT validation)
- Rate limiting & basic request logging
- Path rewriting / versioning

It is built with **Spring Cloud Gateway** and runs on port **8080** by default.

## Key Routes (proxied)
| Path | Target Service |
|------|----------------|
| `/api/auth/**` | User Service (8081) |
| `/api/doctors/**` | Doctor Service (8082) |
| `/api/appointments/**` | Appointment Service (8083) |
| `/api/notifications/**` | Notification Service (8084) |

All routes preserve the original request method and body.

## Tech Stack
- **Spring Cloud Gateway** – reactive API gateway
- **Spring Boot 3.x**
- **Maven** – build tool
- **Spring Security** – JWT validation filter

## Build & Run
```bash
cd api-gateway
mvn clean install
mvn spring-boot:run   # runs on http://localhost:8080
```

## Configuration (application.yml)
```yaml
server:
  port: 8080

gateway:
  routes:
    - id: user-service
      uri: http://localhost:8081
      predicates:
        - Path=/api/auth/**
    - id: doctor-service
      uri: http://localhost:8082
      predicates:
        - Path=/api/doctors/**
    - id: appointment-service
      uri: http://localhost:8083
      predicates:
        - Path=/api/appointments/**
    - id: notification-service
      uri: http://localhost:8084
      predicates:
        - Path=/api/notifications/**
```

## Environment Variables
```
JWT_SECRET=your_jwt_secret   # same secret as other services
```

## Testing
```bash
mvn test
```

---
> The gateway can be extended with additional filters (e.g., request logging, circuit‑breaker) without changing the downstream services.
