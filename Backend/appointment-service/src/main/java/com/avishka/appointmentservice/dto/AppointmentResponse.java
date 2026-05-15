package com.avishka.appointmentservice.dto;

import com.avishka.appointmentservice.enums.AppointmentStatus;
import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentResponse {

    private Long id;
    private Long patientId;
    private Long doctorId;
    private String patientName;
    private String doctorName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String reason;
    private AppointmentStatus status;

    public AppointmentResponse() {}

    public AppointmentResponse(Long id, Long patientId, Long doctorId, String patientName, String doctorName, LocalDate appointmentDate, LocalTime appointmentTime, String reason, AppointmentStatus status) {
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

    public static AppointmentResponseBuilder builder() {
        return new AppointmentResponseBuilder();
    }

    public static class AppointmentResponseBuilder {
        private Long id;
        private Long patientId;
        private Long doctorId;
        private String patientName;
        private String doctorName;
        private LocalDate appointmentDate;
        private LocalTime appointmentTime;
        private String reason;
        private AppointmentStatus status;

        public AppointmentResponseBuilder id(Long id) { this.id = id; return this; }
        public AppointmentResponseBuilder patientId(Long patientId) { this.patientId = patientId; return this; }
        public AppointmentResponseBuilder doctorId(Long doctorId) { this.doctorId = doctorId; return this; }
        public AppointmentResponseBuilder patientName(String patientName) { this.patientName = patientName; return this; }
        public AppointmentResponseBuilder doctorName(String doctorName) { this.doctorName = doctorName; return this; }
        public AppointmentResponseBuilder appointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; return this; }
        public AppointmentResponseBuilder appointmentTime(LocalTime appointmentTime) { this.appointmentTime = appointmentTime; return this; }
        public AppointmentResponseBuilder reason(String reason) { this.reason = reason; return this; }
        public AppointmentResponseBuilder status(AppointmentStatus status) { this.status = status; return this; }

        public AppointmentResponse build() {
            return new AppointmentResponse(id, patientId, doctorId, patientName, doctorName, appointmentDate, appointmentTime, reason, status);
        }
    }
}
