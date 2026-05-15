package com.avishka.appointmentservice.entity;

import com.avishka.appointmentservice.enums.AppointmentStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long patientId;
    private Long doctorId;
    private String patientName;
    private String doctorName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String reason;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    public Appointment() {}

    public Appointment(Long id, Long patientId, Long doctorId, String patientName, String doctorName, LocalDate appointmentDate, LocalTime appointmentTime, String reason, AppointmentStatus status) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.reason = reason;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }
    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }
    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }
    public LocalTime getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(LocalTime appointmentTime) { this.appointmentTime = appointmentTime; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }

    public static AppointmentBuilder builder() {
        return new AppointmentBuilder();
    }

    public static class AppointmentBuilder {
        private Long id;
        private Long patientId;
        private Long doctorId;
        private String patientName;
        private String doctorName;
        private LocalDate appointmentDate;
        private LocalTime appointmentTime;
        private String reason;
        private AppointmentStatus status;

        public AppointmentBuilder id(Long id) { this.id = id; return this; }
        public AppointmentBuilder patientId(Long patientId) { this.patientId = patientId; return this; }
        public AppointmentBuilder doctorId(Long doctorId) { this.doctorId = doctorId; return this; }
        public AppointmentBuilder patientName(String patientName) { this.patientName = patientName; return this; }
        public AppointmentBuilder doctorName(String doctorName) { this.doctorName = doctorName; return this; }
        public AppointmentBuilder appointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; return this; }
        public AppointmentBuilder appointmentTime(LocalTime appointmentTime) { this.appointmentTime = appointmentTime; return this; }
        public AppointmentBuilder reason(String reason) { this.reason = reason; return this; }
        public AppointmentBuilder status(AppointmentStatus status) { this.status = status; return this; }

        public Appointment build() {
            return new Appointment(id, patientId, doctorId, patientName, doctorName, appointmentDate, appointmentTime, reason, status);
        }
    }
}
