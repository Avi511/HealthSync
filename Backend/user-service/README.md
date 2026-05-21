# 👤 HealthSync - User Service

The User Service handles user registrations, user records management, and profiles validation inside the HealthSync application.

---

## ⚙️ Features
* **User Profile Creation:** Handles registration requests with secure password stubbing.
* **User Login Validation:** Verifies user credentials (email and password) to authenticate active sessions.
* **Input Validation:** Enforces requirements for matching email structures, non-blank strings, and robust inputs.
* **Hibernate JPA Persistence:** Integrates with the database layer using dynamic query generation.

---

## 🔌 Configuration
* **Container Name:** `user-service`
* **Local Exposed Port:** `8081`
* **Isolated Database Schema:** `user_db`
* **Technology Stack:** Spring Boot, Spring Data JPA, Lombok, PostgreSQL Driver

---

## 🛣️ API Endpoint Mappings

| Method | Endpoint | Description | Payload (Request) |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/users` | Register a new user profile | JSON containing fields: `firstName`, `lastName`, `email`, `password`, `phone`, `address` |
| **POST** | `/api/users/login` | Authenticate and log in a user | JSON containing fields: `email`, `password` |
| **GET** | `/api/users` | Fetch list of all registered users | None |
| **GET** | `/api/users/{id}`| Fetch a single user profile | ID Path Parameter |
| **PUT** | `/api/users/{id}`| Update user details | JSON with updated fields |
| **DELETE**| `/api/users/{id}`| Delete a user profile | ID Path Parameter |
