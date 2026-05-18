# 🚪 HealthSync - API Gateway

The API Gateway is the unified entry point for all incoming traffic into the HealthSync microservices backend architecture.

---

## ⚙️ Features
* **Reverse Proxy Mapping:** Proxies requests automatically based on sub-paths:
  * `/api/users/**` ➡️ `user-service`
  * `/api/doctors/**` ➡️ `doctor-service`
  * `/api/appointments/**` ➡️ `appointment-service`
  * `/api/notifications/**` ➡️ `notification-service`
* **Dynamic Environment Routes:** Uses container hostname resolution through configured environment variables:
  * `USER_SERVICE_URL`
  * `DOCTOR_SERVICE_URL`
  * `APPOINTMENT_SERVICE_URL`
  * `NOTIFICATION_SERVICE_URL`
* **Global CORS Policies:** Preconfigured to allow access across web environments.

---

## 🔌 Configuration
* **Container Name:** `api-gateway`
* **Local Exposed Port:** `8080`
* **Technology Stack:** Spring Boot, Spring Cloud Gateway, Netty (Reactive Web Server)
