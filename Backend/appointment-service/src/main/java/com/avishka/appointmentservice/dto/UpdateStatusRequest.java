package com.avishka.appointmentservice.dto;

import com.avishka.appointmentservice.enums.AppointmentStatus;

public class UpdateStatusRequest {
    private AppointmentStatus status;
    public UpdateStatusRequest() {}
    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }
}
