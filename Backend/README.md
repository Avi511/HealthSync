# HealthSync Backend

Spring Boot microservice backend for a doctor appointment and healthcare management system.

## Structure

```text
Backend/
├── discovery-server/
├── api-gateway/
├── auth-service/
├── user-service/
├── doctor-service/
├── appointment-service/
├── prescription-service/
├── payment-service/
├── notification-service/
├── review-service/
├── common-library/
├── docker-compose.yml
└── README.md
```

## Modules

| Module | Port | Purpose |
| --- | ---: | --- |
| discovery-server | 8761 | Eureka service registry |
| api-gateway | 8080 | Gateway and route entry point |
| auth-service | 8081 | Authentication service |
| user-service | 8082 | User management service |
| doctor-service | 8083 | Doctor management service |
| appointment-service | 8084 | Appointment management service |
| prescription-service | 8085 | Prescription management service |
| payment-service | 8086 | Payment management service |
| notification-service | 8087 | Notification management service |
| review-service | 8088 | Review management service |
| common-library | n/a | Shared DTOs and common code |

## Build

```bash
mvn clean package
```

## Run Locally

Start the discovery server first:

```bash
mvn spring-boot:run -pl discovery-server
```

Then start any service in a new terminal:

```bash
mvn spring-boot:run -pl auth-service
```

Start the gateway in another terminal:

```bash
mvn spring-boot:run -pl api-gateway
```

Example health/status endpoints:

```text
http://localhost:8761
http://localhost:8081/api/auth/status
http://localhost:8080/api/auth/status
```

## Run With Docker Compose

```bash
docker compose up --build
```
