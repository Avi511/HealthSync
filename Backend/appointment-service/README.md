# 📅 HealthSync - Appointment Service

The Appointment Service manages clinic bookings, linking patients to registered doctors, and driving scheduling status updates.

---

## ⚙️ Features
* **Interactive Booking Logic:** Matches patient identifiers with doctor identifiers.
* **State Lifecycle Management:** Manages step-by-step updates of booking statuses (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
* **Filtering Lists:** Retrieve history segments scoped by individual doctor or patient IDs.

---

## 🔌 Configuration
* **Container Name:** `appointment-service`
* **Local Exposed Port:** `8084`
* **Isolated Database Schema:** `appointment_db`
* **Technology Stack:** Spring Boot, Spring Data JPA, PostgreSQL Driver

---

## 🛣️ API Endpoint Mappings

| Method | Endpoint | Description | Payload (Request) |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/appointments` | Book a new clinic slot | JSON containing fields: `patientId`, `patientName`, `doctorId`, `doctorName`, `appointmentDate`, `appointmentTime`, `reason` |
| **GET** | `/api/appointments` | Retrieve all schedules | None |
| **GET** | `/api/appointments/{id}`| Get details of a single booking | ID Path Parameter |
| **GET** | `/api/appointments/patient/{patientId}` | Retrieve all appointments of a patient | patientId Path Parameter |
| **GET** | `/api/appointments/doctor/{doctorId}` | Retrieve all appointments of a doctor | doctorId Path Parameter |
| **PUT** | `/api/appointments/{id}/status`| Progress booking status | JSON containing field: `status` |
| **DELETE**| `/api/appointments/{id}`| Cancel/Delete appointment record | ID Path Parameter |
