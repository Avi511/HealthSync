# 🥼 HealthSync - Doctor Service

The Doctor Service manages professional clinical profiles, schedules, specialization tracking, and searches within the HealthSync microservices ecosystem.

---

## ⚙️ Features
* **Medical Directory Management:** Register doctor profiles with hospital locations and practice experience.
* **Advanced Specialization Queries:** Search filters to query medical personnel matching specialized fields (e.g., *Cardiology*, *Neurology*).
* **Schedule Availability Records:** Stores weekly time bounds for clinical visits.

---

## 🔌 Configuration
* **Container Name:** `doctor-service`
* **Local Exposed Port:** `8083`
* **Isolated Database Schema:** `doctor_db`
* **Technology Stack:** Spring Boot, Spring Data JPA, Lombok, PostgreSQL Driver

---

## 🛣️ API Endpoint Mappings

| Method | Endpoint | Description | Payload (Request) |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/doctors` | Register a new doctor profile | JSON containing fields: `fullName`, `email`, `specialization`, `experience`, `hospital`, `phone`, `availability` |
| **GET** | `/api/doctors` | Retrieve all registered doctors | None |
| **GET** | `/api/doctors/{id}`| Get doctor by ID | ID Path Parameter |
| **GET** | `/api/doctors/specialization/{spec}` | Query doctors by specialization field | Spec Path Parameter |
| **PUT** | `/api/doctors/{id}`| Update doctor profile details | JSON with updated fields |
| **DELETE**| `/api/doctors/{id}`| Delete doctor listing | ID Path Parameter |
